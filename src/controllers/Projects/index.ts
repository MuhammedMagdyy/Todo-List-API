import asyncHandler from 'express-async-handler';
import { projectSerivce } from '../../services';
import { ApiError, projectSchema } from '../../utils';
import { CREATED, NOT_FOUND, OK } from '../../shared';

export const createProject = asyncHandler(async (req, res) => {
  const schema = projectSchema.parse(req.body);
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
