import { Prisma } from '@prisma/client';
import { projectRepository, ProjectRepository } from '../../repositories';
import { ApiError } from '../../utils';
import { NOT_FOUND } from '../../shared';

export class ProjectSerivce {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async createOne(data: Prisma.ProjectUncheckedCreateInput) {
    return await this.projectRepository.createOne(data);
  }

  async findOne(query: Prisma.ProjectWhereUniqueInput) {
    return await this.projectRepository.findOne(query);
  }

  async findMany() {
    return await this.projectRepository.findMany();
  }

  async findLastFour() {
    return await this.projectRepository.findLastFour();
  }

  async updateOne(
    query: Prisma.ProjectWhereUniqueInput,
    data: Prisma.ProjectUncheckedUpdateInput
  ) {
    return await this.projectRepository.updateOne(query, data);
  }

  async deleteOne(query: Prisma.ProjectWhereUniqueInput) {
    return await this.projectRepository.deleteOne(query);
  }

  async isProjectExists(uuid: string) {
    const project = await this.findOne({ uuid });
    if (!project) {
      throw new ApiError('Project not found', NOT_FOUND);
    }
    return project;
  }

  async deleteProjectByUUID(uuid: string) {
    await this.isProjectExists(uuid);
    await this.deleteOne({ uuid });
  }
}

export const projectSerivce = new ProjectSerivce(projectRepository);
