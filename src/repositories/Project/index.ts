import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '../../database/client';

export class ProjectRepository {
  constructor(private readonly prisma: PrismaClient) {}

  createOne(data: Prisma.ProjectUncheckedCreateInput) {
    return this.prisma.project.create({ data });
  }

  findOne(query: Prisma.ProjectWhereInput) {
    return this.prisma.project.findFirst({ where: query });
  }

  findMany() {
    return this.prisma.project.findMany();
  }
}

export const projectRepository = new ProjectRepository(prisma);
