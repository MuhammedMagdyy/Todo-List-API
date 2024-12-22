import { Prisma } from '@prisma/client';
import { taskRepository, TaskRepository } from '../../repositories';

export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async createOne(data: Prisma.TaskUncheckedCreateInput) {
    return this.taskRepository.createOne(data);
  }

  async findOne(query: Prisma.TaskWhereInput) {
    return this.taskRepository.findOne(query);
  }

  async findMany() {
    return this.taskRepository.findMany();
  }
}

export const taskService = new TaskService(taskRepository);
