import asyncHandler from 'express-async-handler';
import { statusSerivce } from '../../services';
import { OK } from '../../shared';

export const getAllStatuses = asyncHandler(async (req, res) => {
  const statuses = await statusSerivce.findMany();

  res.status(OK).json({ data: statuses });
});
