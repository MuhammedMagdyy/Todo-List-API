import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '../../database/client';

export class TaskRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createOne(data: Prisma.TaskUncheckedCreateInput) {
    return await this.prisma.task.create({ data });
  }

  async findOne(query: Prisma.TaskWhereUniqueInput) {
    return await this.prisma.task.findUnique({ where: query });
  }

  async findMany() {
    return await this.prisma.task.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
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

  async updateOne(
    query: Prisma.TaskWhereUniqueInput,
    data: Prisma.TaskUncheckedUpdateInput
  ) {
    return await this.prisma.task.update({ where: query, data });
  }

  async deleteOne(query: Prisma.TaskWhereUniqueInput) {
    return await this.prisma.task.delete({ where: query });
  }
}

export const taskRepository = new TaskRepository(prisma);
