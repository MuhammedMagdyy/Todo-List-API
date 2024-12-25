import asyncHandler from 'express-async-handler';
import { projectSerivce, statusSerivce } from '../../services';
import { ApiError, projectSchema, projectUpdateSchema } from '../../utils';
import { CREATED, NO_CONTENT, NOT_FOUND, OK } from '../../shared';

export const createProject = asyncHandler(async (req, res, next) => {
  const schema = projectSchema.parse(req.body);
  const { statusUuid } = schema;
  const status = await statusSerivce.findOne({ uuid: statusUuid });

  if (!status) {
    return next(new ApiError('Status not found', NOT_FOUND));
  }

  const project = await projectSerivce.createOne(schema);

  res.status(CREATED).json({ data: project });
});

export const getProject = asyncHandler(async (req, res, next) => {
  const { uuid } = req.params;
  const project = await projectSerivce.findOne({ uuid });

  if (!project) {
    return next(new ApiError('Project not found', NOT_FOUND));
  }

  res.status(OK).json({ data: project });
});

export const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await projectSerivce.findMany();

  res.status(OK).json({ data: projects });
});

export const getLastFourProjects = asyncHandler(async (req, res) => {
  const projects = await projectSerivce.findLastFour();

  res.status(OK).json({ data: projects });
});

export const updateProject = asyncHandler(async (req, res, next) => {
  const { uuid } = req.params;
  const schema = projectUpdateSchema.parse(req.body);
  const project = await projectSerivce.findOne({ uuid });

  if (!project) {
    return next(new ApiError('Project not found', NOT_FOUND));
  }

  const updatedProject = await projectSerivce.updateOne({ uuid }, schema);

  res
    .status(OK)
    .json({ message: 'Project updated successfully!', data: updatedProject });
});

export const deleteProject = asyncHandler(async (req, res, next) => {
  const { uuid } = req.params;
  const project = await projectSerivce.findOne({ uuid });

  if (!project) {
    return next(new ApiError('Project not found', NOT_FOUND));
  }

  await projectSerivce.deleteOne({ uuid });

  res.sendStatus(NO_CONTENT);
});
