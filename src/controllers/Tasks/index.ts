import asyncHandler from 'express-async-handler';
import { taskService } from '../../services';
import { ApiError, taskSchema } from '../../utils';
import { CREATED, NOT_FOUND, OK } from '../../shared';

export const createTask = asyncHandler(async (req, res) => {
  const schema = taskSchema.parse(req.body);
  const task = await taskService.createOne(schema);

  res.status(CREATED).json({ data: task });
});

export const getTask = asyncHandler(async (req, res, next) => {
  const { uuid } = req.params;
  const task = await taskService.findOne({ uuid });

  if (!task) {
    return next(new ApiError('Task not found', NOT_FOUND));
  }

  res.status(OK).json({ data: task });
});

export const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await taskService.findMany();

  res.status(OK).json({ data: tasks });
});

export const getLastFourTasks = asyncHandler(async (req, res) => {
  const tasks = await taskService.findLastFour();

  res.status(OK).json({ data: tasks });
});
