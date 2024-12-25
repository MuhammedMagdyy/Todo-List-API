import { Prisma } from '@prisma/client';
import { taskRepository, TaskRepository } from '../../repositories';

export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async createOne(data: Prisma.TaskUncheckedCreateInput) {
    return await this.taskRepository.createOne(data);
  }

  async findOne(query: Prisma.TaskWhereUniqueInput) {
    return await this.taskRepository.findOne(query);
  }

  async findMany() {
    return await this.taskRepository.findMany();
  }

  async findLastFour() {
    return await this.taskRepository.findLastFour();
  }

  async updateOne(
    query: Prisma.TaskWhereUniqueInput,
    data: Prisma.TaskUncheckedUpdateInput
  ) {
    return await this.taskRepository.updateOne(query, data);
  }

  async deleteOne(query: Prisma.TaskWhereUniqueInput) {
    return await this.taskRepository.deleteOne(query);
  }
}

export const taskService = new TaskService(taskRepository);
