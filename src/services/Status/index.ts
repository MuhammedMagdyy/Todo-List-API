import { Prisma } from '@prisma/client';
import { statusRepository, StatusRepository } from '../../repositories';

export class StatusSerivce {
  constructor(private readonly statusRepository: StatusRepository) {}

  async findOne(query: Prisma.StatusWhereUniqueInput) {
    return await this.statusRepository.findOne(query);
  }

  async findMany() {
    return await this.statusRepository.findMany();
  }
}

export const statusSerivce = new StatusSerivce(statusRepository);
