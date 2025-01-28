import { HttpExceptionStatusCodes } from '../types';

export class ApiError extends Error {
  status: HttpExceptionStatusCodes;

  constructor(message: string, status: HttpExceptionStatusCodes) {
    super(message);
    this.status = status;
  }
}
