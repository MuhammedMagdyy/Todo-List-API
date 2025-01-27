import { Request, Response, NextFunction } from 'express';
import { UNAUTHORIZED } from '../utils';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isUnauthenticated()) {
    res.status(UNAUTHORIZED).json({ message: 'Unauthorized' });
    return;
  }

  next();
};
