import { Prisma } from '@prisma/client';
import { projectRepository, ProjectRepository } from '../../repositories';

export class ProjectSerivce {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async createOne(data: Prisma.ProjectUncheckedCreateInput) {
    return this.projectRepository.createOne(data);
  }

  async findOne(query: Prisma.ProjectWhereInput) {
    return this.projectRepository.findOne(query);
  }

  async findMany() {
    return this.projectRepository.findMany();
  }
}

export const projectSerivce = new ProjectSerivce(projectRepository);
