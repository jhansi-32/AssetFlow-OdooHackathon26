import { Prisma, Role, User } from '@prisma/client';
import { prisma } from '../config/database';

export class UserRepository {
  findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data });
  }

  updatePassword(id: string, passwordHash: string): Promise<User> {
    return prisma.user.update({ where: { id }, data: { passwordHash } });
  }

  updateRole(id: string, role: Role, departmentId?: string | null): Promise<User> {
    return prisma.user.update({ where: { id }, data: { role, departmentId } });
  }

  updateStatus(id: string, status: 'ACTIVE' | 'INACTIVE'): Promise<User> {
    return prisma.user.update({ where: { id }, data: { status } });
  }

  list(params: { skip: number; take: number; orderBy?: Record<string, 'asc' | 'desc'>; where?: Prisma.UserWhereInput }) {
    return prisma.$transaction([
      prisma.user.findMany({ skip: params.skip, take: params.take, orderBy: params.orderBy, where: params.where }),
      prisma.user.count({ where: params.where }),
    ]);
  }
}

export const userRepository = new UserRepository();
