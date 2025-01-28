import asyncHandler from 'express-async-handler';
import { tagService } from '../services';
import {
  tagSchema,
  CREATED,
  OK,
  paginationSchema,
  DB_COLUNMS,
  BAD_REQUEST,
  sortSchema,
} from '../utils';
import { ISortQuery } from '../types';

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
  const { pageNumber, pageSize } = paginationSchema.parse(req.query);
  const { sortBy, order } = sortSchema.parse(req.query);
  const validColumns = Object.values(DB_COLUNMS.TAG);
  const sortFields = sortBy?.split(',') || [];
  const sortOrders = order?.split(',') || [];

  const invalidFields = sortFields.filter(
    (field) => !validColumns.includes(field)
  );
  if (invalidFields.length > 0) {
    res.status(BAD_REQUEST).json({
      message: `Invalid sort field(s): ${invalidFields.join(', ')}. Allowed fields: ${validColumns.join(', ')}`,
    });
    return;
  }

  const orderBy: ISortQuery = sortFields.map((field, index) => ({
    [field]: sortOrders[index] === 'desc' ? 'desc' : 'asc',
  }));

  const tags = await tagService.findMany(
    { pageNumber, pageSize },
    orderBy.length > 0 ? orderBy : undefined
  );

  res.status(OK).json({ message: 'Retrieved tags successfully!', data: tags });
});
