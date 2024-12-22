import { Prisma } from '@prisma/client';
import { tagRepository, TagRepository } from '../../repositories';

export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async createOne(data: Prisma.TagUncheckedCreateInput) {
    return this.tagRepository.createOne(data);
  }

  async findOne(query: Prisma.TagWhereInput) {
    return this.tagRepository.findOne(query);
  }

  async findMany() {
    return this.tagRepository.findMany();
  }
}

export const tagService = new TagService(tagRepository);
