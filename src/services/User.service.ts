import { Prisma } from '@prisma/client';
import { userRepository, UserRepository } from '../repositories';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createOne(data: Prisma.UserUncheckedCreateInput) {
    return await this.userRepository.createOne(data);
  }

  async updateOne(
    query: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUncheckedUpdateInput
  ) {
    return await this.userRepository.updateOne(query, data);
  }

  async findUserByProviderId(providerId: string) {
    return await this.userRepository.findOne({ providerId });
  }

  async findUserByUUID(uuid: string) {
    return await this.userRepository.findOne({ uuid });
  }
}

export const userService = new UserService(userRepository);
