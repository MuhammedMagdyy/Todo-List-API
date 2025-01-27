import asyncHandler from 'express-async-handler';
import { statusSerivce } from '../../services';
import { OK } from '../../utils';

export const getStatus = asyncHandler(async (req, res) => {
  const { uuid } = req.params;
  const status = await statusSerivce.isStatusExists(uuid);

  res
    .status(OK)
    .json({ message: 'Retrieved status successfully', data: status });
});

export const getAllStatuses = asyncHandler(async (req, res) => {
  const statuses = await statusSerivce.findMany();

  res
    .status(OK)
    .json({ message: 'Retrieved statuses successfully', data: statuses });
});
