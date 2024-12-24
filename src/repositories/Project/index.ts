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
    return this.prisma.project.findMany({ include: { tasks: true } });
  }

  findLastFour() {
    return this.prisma.project.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      take: 4,
    });
  }
}

export const projectRepository = new ProjectRepository(prisma);
