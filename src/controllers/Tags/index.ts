import asyncHandler from 'express-async-handler';
import { tagService } from '../../services';
import { tagSchema, CREATED, OK } from '../../utils';

export const createTag = asyncHandler(async (req, res) => {
  const schema = tagSchema.parse(req.body);
  const tag = await tagService.createOne(schema);

  res.status(CREATED).json({ message: 'Tag created successfully!', data: tag });
});

export const getTag = asyncHandler(async (req, res) => {
  const { uuid } = req.params;
  const tag = await tagService.isTagExists(uuid);

  res.status(OK).json({ message: 'Retrieved tag successfully!', data: tag });
});

export const getAllTags = asyncHandler(async (req, res) => {
  const tags = await tagService.findMany();

  res.status(OK).json({ message: 'Retrieved tags successfully!', data: tags });
});
