import { prisma } from '../config/database';

export class PasswordResetTokenRepository {
  create(userId: string, token: string, expiresAt: Date) {
    return prisma.passwordResetToken.create({ data: { userId, token, expiresAt } });
  }

  findValid(token: string) {
    return prisma.passwordResetToken.findFirst({
      where: { token, used: false, expiresAt: { gt: new Date() } },
    });
  }

  markUsed(token: string) {
    return prisma.passwordResetToken.updateMany({ where: { token }, data: { used: true } });
  }
}

export const passwordResetTokenRepository = new PasswordResetTokenRepository();
