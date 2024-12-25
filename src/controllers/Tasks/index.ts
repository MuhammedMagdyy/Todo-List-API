import asyncHandler from 'express-async-handler';
import {
  taskService,
  projectSerivce,
  tagService,
  statusSerivce,
} from '../../services';
import { ApiError, taskSchema } from '../../utils';
import { CREATED, NO_CONTENT, NOT_FOUND, OK, BAD_REQUEST } from '../../shared';

export const createTask = asyncHandler(async (req, res, next) => {
  const schema = taskSchema.parse(req.body);
  const { projectUuid, tagUuid, statusUuid } = schema;
  const project = await projectSerivce.findOne({ uuid: projectUuid });

  if (!project) {
    return next(new ApiError('Project not found', BAD_REQUEST));
  }

  if (tagUuid) {
    const tag = await tagService.findOne({ uuid: tagUuid });

    if (!tag) {
      return next(new ApiError('Tag not found', BAD_REQUEST));
    }
  }

  const status = await statusSerivce.findOne({ uuid: statusUuid });

  if (!status) {
    return next(new ApiError('Status not found', BAD_REQUEST));
  }

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

export const updateTask = asyncHandler(async (req, res, next) => {
  const { uuid } = req.params;
  const schema = taskSchema.parse(req.body);
  const task = await taskService.findOne({ uuid });

  if (!task) {
    return next(new ApiError('Task not found', NOT_FOUND));
  }

  const updatedTask = await taskService.updateOne({ uuid }, schema);

  res
    .status(OK)
    .json({ message: 'Task updated successfully!', data: updatedTask });
});

export const deleteTask = asyncHandler(async (req, res, next) => {
  const { uuid } = req.params;
  const task = await taskService.findOne({ uuid });

  if (!task) {
    return next(new ApiError('Task not found', NOT_FOUND));
  }

  await taskService.deleteOne({ uuid });

  res.sendStatus(NO_CONTENT);
});
