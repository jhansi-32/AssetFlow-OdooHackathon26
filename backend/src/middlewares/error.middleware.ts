import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/appError';
import { sendError } from '../utils/response.util';
import { logger } from '../utils/logger';
import { HTTP_STATUS } from '../constants/httpStatus';

export function errorMiddleware(err: unknown, req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof AppError) {
    if (!err.isOperational) logger.error(err.stack);
    sendError(res, err.statusCode, err.message, err.errors);
    return;
  }

  if (err instanceof ZodError) {
    sendError(res, HTTP_STATUS.BAD_REQUEST, 'Validation failed', err.issues);
    return;
  }

  const e = err as { code?: string; statusCode?: number; message?: string };

  // Prisma unique constraint violation
  if (e.code === 'P2002') {
    sendError(res, HTTP_STATUS.CONFLICT, 'A record with this value already exists', null);
    return;
  }

  logger.error(`Unhandled error on ${req.method} ${req.originalUrl}: ${e.message}`, err);
  sendError(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Internal server error', null);
}
