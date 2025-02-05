import asyncHandler from 'express-async-handler';
import { ApiError, NOT_FOUND } from '../utils';
import { userService } from '../services';
import { IUser } from '../interfaces';

export const getUser = asyncHandler(async (req, res, next) => {
  const uuid = req.user?.uuid as string;

  const isUserExists = (await userService.findUserByUUID(uuid)) as IUser;

  if (!isUserExists) {
    return next(new ApiError('User not found', NOT_FOUND));
  }

  const user: IUser = {
    uuid: isUserExists.uuid,
    name: isUserExists.name,
    email: isUserExists.email,
    picture: isUserExists.picture,
  };

  res.json({ message: 'User retrieved successfully!', data: user });
});
