import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '../database/client';
import { IPaginationQuery } from '../interfaces';
import { PaginationService } from '../services/Pagination.service';
import { ISortQuery } from '../types';

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

  async findMany(options: IPaginationQuery, orderBy?: ISortQuery) {
    return await this.prisma.status.findMany({
      ...PaginationService.getPagination(options),
      select: {
        uuid: true,
        name: true,
        color: true,
      },
      orderBy,
    });
  }
}

export const statusRepository = new StatusRepository(prisma);
