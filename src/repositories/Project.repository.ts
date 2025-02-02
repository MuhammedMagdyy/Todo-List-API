import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '../database/client';
import { IPaginationQuery } from '../interfaces';
import { PaginationService } from '../services';
import { ISortQuery } from '../types';

export class ProjectRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createOne(data: Prisma.ProjectUncheckedCreateInput) {
    return await this.prisma.project.create({ data });
  }

  async findOne(query: Prisma.ProjectWhereUniqueInput) {
    return await this.prisma.project.findUnique({ where: query });
  }

  async findMany(pagination: IPaginationQuery, orderBy?: ISortQuery) {
    return await this.prisma.project.findMany({
      ...PaginationService.getPagination(pagination),
      orderBy,
    });
  }

  async updateOne(
    query: Prisma.ProjectWhereUniqueInput,
    data: Prisma.ProjectUncheckedUpdateInput
  ) {
    return await this.prisma.project.update({ where: query, data });
  }

  async deleteOne(query: Prisma.ProjectWhereUniqueInput) {
    return await this.prisma.project.delete({ where: query });
  }
}

export const projectRepository = new ProjectRepository(prisma);
