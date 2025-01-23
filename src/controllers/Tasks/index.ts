import asyncHandler from 'express-async-handler';
import {
  taskService,
  projectSerivce,
  tagService,
  statusSerivce,
} from '../../services';
import { taskSchema } from '../../utils';
import { CREATED, NO_CONTENT, OK } from '../../shared';

export const createTask = asyncHandler(async (req, res) => {
  const schema = taskSchema.parse(req.body);
  const { projectUuid, tagUuid, statusUuid } = schema;
  await projectSerivce.isProjectExists(projectUuid);

  if (tagUuid) {
    await tagService.isTagExists(tagUuid);
  }

  await statusSerivce.isStatusExists(statusUuid);

  const task = await taskService.createOne(schema);

  res
    .status(CREATED)
    .json({ message: 'Task created successfully!', data: task });
});

export const getTask = asyncHandler(async (req, res) => {
  const { uuid } = req.params;
  const task = await taskService.isTaskExists(uuid);

  res.status(OK).json({ message: 'Retrieved task successfully!', data: task });
});

export const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await taskService.findMany();

  res
    .status(OK)
    .json({ message: 'Retrieved tasks successfully!', data: tasks });
});

export const getLastFourTasks = asyncHandler(async (req, res) => {
  const tasks = await taskService.findLastFour();

  res
    .status(OK)
    .json({ message: 'Retrieved last four tasks successfully!', data: tasks });
});

export const updateTask = asyncHandler(async (req, res) => {
  const { uuid } = req.params;
  const schema = taskSchema.parse(req.body);

  await taskService.isTaskExists(uuid);

  const updatedTask = await taskService.updateOne({ uuid }, schema);

  res
    .status(OK)
    .json({ message: 'Task updated successfully!', data: updatedTask });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const { uuid } = req.params;
  await taskService.deleteTaskByUUID(uuid);

  res.sendStatus(NO_CONTENT);
});
