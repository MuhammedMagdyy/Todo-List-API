import { statusRepository, StatusRepository } from '../../repositories';

export class StatusSerivce {
  constructor(private readonly statusRepository: StatusRepository) {}

  async findMany() {
    return await this.statusRepository.findMany();
  }
}

export const statusSerivce = new StatusSerivce(statusRepository);
