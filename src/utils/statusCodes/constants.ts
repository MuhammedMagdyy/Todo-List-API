import { HttpSuccessStatusCodes, HttpExceptionStatusCodes } from '../../types';

// HTTP status codes (Success codes)
export const OK: HttpSuccessStatusCodes = 200;
export const CREATED: HttpSuccessStatusCodes = 201;
export const NO_CONTENT: HttpSuccessStatusCodes = 204;

// HTTP status codes (Error codes)
export const BAD_REQUEST: HttpExceptionStatusCodes = 400;
export const UNAUTHORIZED: HttpExceptionStatusCodes = 401;
export const FORBIDDEN: HttpExceptionStatusCodes = 403;
export const NOT_FOUND: HttpExceptionStatusCodes = 404;
export const INTERNAL_SERVER_ERROR: HttpExceptionStatusCodes = 500;
