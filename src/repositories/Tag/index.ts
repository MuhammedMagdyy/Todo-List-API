import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '../../database/client';
import { IPaginationQuery } from '../../interfaces';
import { PaginationService } from '../../services/Pagination.service';
import { ISortQuery } from '../../types';

export class TagRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createOne(data: Prisma.TagUncheckedCreateInput) {
    return await this.prisma.tag.create({ data });
  }

  async findOne(query: Prisma.TagWhereUniqueInput) {
    return await this.prisma.tag.findUnique({ where: query });
  }

  async findMany(options: IPaginationQuery, orderBy?: ISortQuery) {
    return await this.prisma.tag.findMany({
      ...PaginationService.getPagination(options),
      orderBy,
    });
  }
}

export const tagRepository = new TagRepository(prisma);
