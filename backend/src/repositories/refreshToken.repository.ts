import { prisma } from '../config/database';

export class RefreshTokenRepository {
  create(userId: string, token: string, expiresAt: Date) {
    return prisma.refreshToken.create({ data: { userId, token, expiresAt } });
  }

  findValid(token: string) {
    return prisma.refreshToken.findFirst({
      where: { token, revoked: false, expiresAt: { gt: new Date() } },
    });
  }

  revoke(token: string) {
    return prisma.refreshToken.updateMany({ where: { token }, data: { revoked: true } });
  }

  revokeAllForUser(userId: string) {
    return prisma.refreshToken.updateMany({ where: { userId, revoked: false }, data: { revoked: true } });
  }
}

export const refreshTokenRepository = new RefreshTokenRepository();
