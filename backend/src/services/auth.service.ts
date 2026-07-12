import { v4 as uuidv4 } from 'uuid';
import { Role } from '@prisma/client';
import { userRepository } from '../repositories/user.repository';
import { refreshTokenRepository } from '../repositories/refreshToken.repository';
import { passwordResetTokenRepository } from '../repositories/passwordResetToken.repository';
import { hashPassword, comparePassword } from '../utils/password.util';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt.util';
import { ConflictError, UnauthorizedError, NotFoundError } from '../utils/appError';
import { LoginDto, SignupDto, AuthTokensDto, UserResponseDto } from '../dto/auth.dto';
import { env } from '../config/env';
import { sendEmail } from '../utils/email.util';
import { logActivity } from '../utils/activityLogger';

function toUserResponse(user: {
  id: string; name: string; email: string; role: Role; departmentId: string | null; status: string;
}): UserResponseDto {
  return { id: user.id, name: user.name, email: user.email, role: user.role, departmentId: user.departmentId, status: user.status };
}

function refreshExpiryDate(): Date {
  // JWT_REFRESH_EXPIRES_IN like "7d" — parsed loosely here; token itself carries the real expiry.
  const days = parseInt(env.JWT_REFRESH_EXPIRES_IN, 10) || 7;
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

export class AuthService {
  async signup(input: SignupDto): Promise<UserResponseDto> {
    const existing = await userRepository.findByEmail(input.email);
    if (existing) throw new ConflictError('An account with this email already exists');

    const passwordHash = await hashPassword(input.password);

    // Signup always creates a plain Employee account. Role elevation only
    // happens later, via Admin promotion in the Employee Directory.
    const user = await userRepository.create({
      name: input.name,
      email: input.email,
      passwordHash,
      role: Role.EMPLOYEE,
    });

    await logActivity({ userId: user.id, action: 'SIGNUP', entity: 'User', entityId: user.id });

    return toUserResponse(user);
  }

  async login(input: LoginDto): Promise<{ user: UserResponseDto; tokens: AuthTokensDto }> {
    const user = await userRepository.findByEmail(input.email);
    if (!user) throw new UnauthorizedError('Invalid email or password');
    if (user.status !== 'ACTIVE') throw new UnauthorizedError('Account is inactive');

    const valid = await comparePassword(input.password, user.passwordHash);
    if (!valid) throw new UnauthorizedError('Invalid email or password');

    const tokens = await this.issueTokens(user.id, user.email, user.role, user.departmentId);

    await logActivity({ userId: user.id, action: 'LOGIN', entity: 'User', entityId: user.id });

    return { user: toUserResponse(user), tokens };
  }

  async refresh(refreshToken: string): Promise<AuthTokensDto> {
    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new UnauthorizedError('Invalid or expired refresh token');
    }

    const stored = await refreshTokenRepository.findValid(refreshToken);
    if (!stored) throw new UnauthorizedError('Refresh token has been revoked or expired');

    const user = await userRepository.findById(payload.sub);
    if (!user || user.status !== 'ACTIVE') throw new UnauthorizedError('User no longer active');

    await refreshTokenRepository.revoke(refreshToken);
    return this.issueTokens(user.id, user.email, user.role, user.departmentId);
  }

  async logout(refreshToken: string): Promise<void> {
    await refreshTokenRepository.revoke(refreshToken);
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await userRepository.findByEmail(email);
    // Do not leak whether the email exists.
    if (!user) return;

    const token = uuidv4();
    const expiresAt = new Date(Date.now() + env.RESET_PASSWORD_TOKEN_EXPIRES_MIN * 60 * 1000);
    await passwordResetTokenRepository.create(user.id, token, expiresAt);

    const html = `<p>Use this token to reset your AssetFlow password (valid ${env.RESET_PASSWORD_TOKEN_EXPIRES_MIN} minutes): <b>${token}</b></p>`;
    await sendEmail(user.email, 'AssetFlow — Reset your password', html);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const record = await passwordResetTokenRepository.findValid(token);
    if (!record) throw new UnauthorizedError('Invalid or expired reset token');

    const passwordHash = await hashPassword(newPassword);
    await userRepository.updatePassword(record.userId, passwordHash);
    await passwordResetTokenRepository.markUsed(token);
    await refreshTokenRepository.revokeAllForUser(record.userId);
  }

  async getProfile(userId: string): Promise<UserResponseDto> {
    const user = await userRepository.findById(userId);
    if (!user) throw new NotFoundError('User not found');
    return toUserResponse(user);
  }

  private async issueTokens(userId: string, email: string, role: Role, departmentId: string | null): Promise<AuthTokensDto> {
    const accessToken = signAccessToken({ sub: userId, email, role, departmentId });
    const tokenId = uuidv4();
    const refreshToken = signRefreshToken({ sub: userId, tokenId });
    await refreshTokenRepository.create(userId, refreshToken, refreshExpiryDate());
    return { accessToken, refreshToken };
  }
}

export const authService = new AuthService();
