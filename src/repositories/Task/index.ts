import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '../../database/client';

export class TaskRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createOne(data: Prisma.TaskUncheckedCreateInput) {
    return await this.prisma.task.create({ data });
  }

  async findOne(query: Prisma.TaskWhereInput) {
    return await this.prisma.task.findFirst({ where: query });
  }

  async findMany() {
    return await this.prisma.task.findMany();
  }

  async findLastFour() {
    return await this.prisma.task.findMany({
      include: {
        tag: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 4,
    });
  }
}

export const taskRepository = new TaskRepository(prisma);
