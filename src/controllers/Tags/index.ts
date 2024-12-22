import asyncHandler from 'express-async-handler';
import { tagService } from '../../services';
import { ApiError, tagSchema } from '../../utils';
import { CREATED, NOT_FOUND, OK } from '../../shared';

export const createTag = asyncHandler(async (req, res) => {
  const schema = tagSchema.parse(req.body);
  const tag = await tagService.createOne(schema);

  res.status(CREATED).json({ data: tag });
});

export const getTag = asyncHandler(async (req, res, next) => {
  const { uuid } = req.params;
  const tag = await tagService.findOne({ uuid });

  if (!tag) {
    return next(new ApiError('Tag not found', NOT_FOUND));
  }

  res.status(OK).json({ data: tag });
});

export const getAllTags = asyncHandler(async (req, res) => {
  const tags = await tagService.findMany();

  res.status(OK).json({ data: tags });
});
