import { PrismaClient } from '@prisma/client';
import prisma from '../../database/client';

export class StatusRepository {
  constructor(private readonly prisma: PrismaClient) {}

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
