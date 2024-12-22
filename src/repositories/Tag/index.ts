import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '../../database/client';

export class TagRepository {
  constructor(private readonly prisma: PrismaClient) {}

  createOne(data: Prisma.TagUncheckedCreateInput) {
    return this.prisma.tag.create({ data });
  }

  findOne(query: Prisma.TagWhereInput) {
    return this.prisma.tag.findFirst({ where: query });
  }

  findMany() {
    return this.prisma.tag.findMany();
  }
}

export const tagRepository = new TagRepository(prisma);
