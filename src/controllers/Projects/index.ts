import asyncHandler from 'express-async-handler';
import { projectSerivce, statusSerivce } from '../../services';
import {
  projectSchema,
  projectUpdateSchema,
  CREATED,
  NO_CONTENT,
  OK,
} from '../../utils';

export const createProject = asyncHandler(async (req, res) => {
  const schema = projectSchema.parse(req.body);
  const { statusUuid } = schema;

  await statusSerivce.isStatusExists(statusUuid);

  const project = await projectSerivce.createOne(schema);

  res
    .status(CREATED)
    .json({ message: 'Project created successfully!', data: project });
});

export const getProject = asyncHandler(async (req, res) => {
  const { uuid } = req.params;
  const project = await projectSerivce.isProjectExists(uuid);

  res
    .status(OK)
    .json({ message: 'Retrieved project successfully!', data: project });
});

export const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await projectSerivce.findMany();

  res
    .status(OK)
    .json({ message: 'Retrieved projects successfully!', data: projects });
});

export const getLastFourProjects = asyncHandler(async (req, res) => {
  const projects = await projectSerivce.findLastFour();

  res.status(OK).json({
    message: 'Retrieved last four projects successfully!',
    data: projects,
  });
});

export const updateProject = asyncHandler(async (req, res) => {
  const { uuid } = req.params;
  const schema = projectUpdateSchema.parse(req.body);

  await projectSerivce.isProjectExists(uuid);

  const updatedProject = await projectSerivce.updateOne({ uuid }, schema);

  res
    .status(OK)
    .json({ message: 'Project updated successfully!', data: updatedProject });
});

export const deleteProject = asyncHandler(async (req, res) => {
  const { uuid } = req.params;
  await projectSerivce.deleteProjectByUUID(uuid);

  res.sendStatus(NO_CONTENT);
});
