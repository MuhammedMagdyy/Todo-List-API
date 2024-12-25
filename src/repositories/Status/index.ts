import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '../../database/client';

export class StatusRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findOne(query: Prisma.StatusWhereUniqueInput) {
    return await this.prisma.status.findUnique({
      where: query,
      select: {
        uuid: true,
        name: true,
        color: true,
      },
    });
  }

  async findMany() {
    return await this.prisma.status.findMany({
      select: {
        uuid: true,
        name: true,
        color: true,
      },
    });
  }
}

export const statusRepository = new StatusRepository(prisma);
