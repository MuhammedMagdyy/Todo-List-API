import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '../../database/client';

export class TagRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createOne(data: Prisma.TagUncheckedCreateInput) {
    return await this.prisma.tag.create({ data });
  }

  async findOne(query: Prisma.TagWhereUniqueInput) {
    return await this.prisma.tag.findUnique({ where: query });
  }

  async findMany() {
    return await this.prisma.tag.findMany();
  }
}

export const tagRepository = new TagRepository(prisma);
