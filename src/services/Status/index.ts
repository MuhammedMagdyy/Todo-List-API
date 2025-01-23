import { Prisma } from '@prisma/client';
import { statusRepository, StatusRepository } from '../../repositories';
import { ApiError } from '../../utils';
import { NOT_FOUND } from '../../shared';

export class StatusSerivce {
  constructor(private readonly statusRepository: StatusRepository) {}

  async findOne(query: Prisma.StatusWhereUniqueInput) {
    return await this.statusRepository.findOne(query);
  }

  async findMany() {
    return await this.statusRepository.findMany();
  }

  async isStatusExists(uuid: string) {
    const status = await this.findOne({ uuid });
    if (!status) {
      throw new ApiError('Status not found', NOT_FOUND);
    }
    return status;
  }
}

export const statusSerivce = new StatusSerivce(statusRepository);
