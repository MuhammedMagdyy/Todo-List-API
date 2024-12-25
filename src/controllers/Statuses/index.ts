import asyncHandler from 'express-async-handler';
import { statusSerivce } from '../../services';
import { ApiError } from '../../utils';
import { OK, NOT_FOUND } from '../../shared';

export const getStatus = asyncHandler(async (req, res, next) => {
  const { uuid } = req.params;
  const status = await statusSerivce.findOne({ uuid });

  if (!status) {
    return next(new ApiError('Status not found', NOT_FOUND));
  }

  res.status(OK).json({ data: status });
});

export const getAllStatuses = asyncHandler(async (req, res) => {
  const statuses = await statusSerivce.findMany();

  res.status(OK).json({ data: statuses });
});
