import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '../../database/client';

export class ProjectRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createOne(data: Prisma.ProjectUncheckedCreateInput) {
    return await this.prisma.project.create({ data });
  }

  async findOne(query: Prisma.ProjectWhereInput) {
    return await this.prisma.project.findFirst({ where: query });
  }

  async findMany() {
    return await this.prisma.project.findMany({
      include: {
        tasks: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  async findLastFour() {
    return await this.prisma.project.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      take: 4,
    });
  }
}

export const projectRepository = new ProjectRepository(prisma);
