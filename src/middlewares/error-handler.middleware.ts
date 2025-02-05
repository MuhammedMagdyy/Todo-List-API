import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import {
  ApiError,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} from '../utils';
import { Prisma } from '@prisma/client';
import { JsonWebTokenError } from 'jsonwebtoken';

type ErrorType =
  | ApiError
  | ZodError
  | Error
  | Prisma.PrismaClientKnownRequestError
  | JsonWebTokenError;

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
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaError = handlePrismaError(error);
    res.status(prismaError.status).json({ message: prismaError.message });
  } else if (error instanceof JsonWebTokenError) {
    res.status(UNAUTHORIZED).json({ message: 'Invalid token' });
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
    .json({ message: 'Internal server error: Please try again later...' });
};

const handlePrismaError = (error: Prisma.PrismaClientKnownRequestError) => {
  // TODO: Gonna handle more errors in the future

  switch (error.code) {
    case 'P2002':
      return new ApiError(
        `Duplicate field value: ${error.meta?.target as string}`,
        BAD_REQUEST
      );

    case 'P2003':
      return new ApiError('Foreign key constraint failed', BAD_REQUEST);

    default:
      return new ApiError(
        `Something went wront: Please make sure your database server is running`,
        INTERNAL_SERVER_ERROR
      );
  }
};
