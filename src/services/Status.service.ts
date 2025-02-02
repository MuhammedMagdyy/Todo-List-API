import { Prisma } from '@prisma/client';
import { statusRepository, StatusRepository } from '../repositories';
import { ApiError, NOT_FOUND } from '../utils';
import { ISortQuery } from '../types';

export class StatusSerivce {
  constructor(private readonly statusRepository: StatusRepository) {}

  async findOne(query: Prisma.StatusWhereUniqueInput) {
    return await this.statusRepository.findOne(query);
  }

  async findMany(orderBy?: ISortQuery) {
    return await this.statusRepository.findMany(orderBy);
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
