import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '../../database/client';
import { IPaginationQuery } from '../../interfaces';
import { PaginationService } from '../../services/Pagination.service';
import { ISortQuery } from '../../types';

export class TaskRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createOne(data: Prisma.TaskUncheckedCreateInput) {
    return await this.prisma.task.create({ data });
  }

  async findOne(query: Prisma.TaskWhereUniqueInput) {
    return await this.prisma.task.findUnique({ where: query });
  }

  async findMany(options: IPaginationQuery, orderBy?: ISortQuery) {
    return await this.prisma.task.findMany({
      ...PaginationService.getPagination(options),
      orderBy,
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
