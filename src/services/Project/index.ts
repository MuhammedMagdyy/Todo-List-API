import { Prisma } from '@prisma/client';
import { projectRepository, ProjectRepository } from '../../repositories';

export class ProjectSerivce {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async createOne(data: Prisma.ProjectUncheckedCreateInput) {
    return await this.projectRepository.createOne(data);
  }

  async findOne(query: Prisma.ProjectWhereInput) {
    return await this.projectRepository.findOne(query);
  }

  async findMany() {
    return await this.projectRepository.findMany();
  }

  async findLastFour() {
    return await this.projectRepository.findLastFour();
  }
}

export const projectSerivce = new ProjectSerivce(projectRepository);
