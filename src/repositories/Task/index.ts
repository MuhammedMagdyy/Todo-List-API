import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '../../database/client';

export class TaskRepository {
  constructor(private readonly prisma: PrismaClient) {}

  createOne(data: Prisma.TaskUncheckedCreateInput) {
    return this.prisma.task.create({ data });
  }

  findOne(query: Prisma.TaskWhereInput) {
    return this.prisma.task.findFirst({ where: query });
  }

  findMany() {
    return this.prisma.task.findMany();
  }
}

export const taskRepository = new TaskRepository(prisma);
