import { Prisma } from '@prisma/client';
import { tagRepository, TagRepository } from '../../repositories';

export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async createOne(data: Prisma.TagUncheckedCreateInput) {
    return await this.tagRepository.createOne(data);
  }

  async findOne(query: Prisma.TagWhereInput) {
    return await this.tagRepository.findOne(query);
  }

  async findMany() {
    return await this.tagRepository.findMany();
  }
}

export const tagService = new TagService(tagRepository);
