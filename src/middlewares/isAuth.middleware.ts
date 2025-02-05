import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { JwtService } from '../services';
import { ApiError, UNAUTHORIZED } from '../utils';
import { IJwtPayload } from '../interfaces';

export const isAuth = asyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new ApiError('Unauthorized', UNAUTHORIZED));
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return next(new ApiError('Unauthorized', UNAUTHORIZED));
    }

    const decoded = JwtService.verify(token, 'access') as IJwtPayload;

    req.user = { uuid: decoded.uuid };
    next();
  }
);
