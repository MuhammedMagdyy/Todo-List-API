import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '../database/client';

export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createOne(data: Prisma.UserUncheckedCreateInput) {
    return await this.prisma.user.create({ data });
  }

  async findOne(query: Prisma.UserWhereInput) {
    return await this.prisma.user.findFirst({ where: query });
  }

  async updateOne(
    query: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUncheckedUpdateInput
  ) {
    return await this.prisma.user.update({ where: query, data });
  }
}

export const userRepository = new UserRepository(prisma);
