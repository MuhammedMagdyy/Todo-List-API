import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { ApiError, BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../utils';

type ErrorType = ApiError | ZodError | Error;

export const errorHandler: ErrorRequestHandler = (
  error: ErrorType,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof ApiError) {
    res.status(error.status).json({ message: error.message });
  } else if (error instanceof ZodError) {
    const errors = error.issues.map((issue) => {
      return {
        field: issue.path.join('.'),
        message: issue.message,
      };
    });
    res.status(BAD_REQUEST).json({ message: 'Validation failed', errors });
  } else {
    if (process.env.NODE_ENV === 'development') {
      sendErrorToDev(error, res);
    } else {
      sendErrorToProd(error, res);
    }
  }
};

const sendErrorToDev = (error: ErrorType, res: Response): void => {
  res.status(INTERNAL_SERVER_ERROR).json({
    cause: 'Internal server error',
    message: error.message,
    stack: error.stack,
  });
};

const sendErrorToProd = (error: ErrorType, res: Response): void => {
  res
    .status(INTERNAL_SERVER_ERROR)
    .json({ cause: 'Internal server error', message: error.message });
};
