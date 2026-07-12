import { Request, Response } from 'express';
import { sendError } from '../utils/response.util';
import { HTTP_STATUS } from '../constants/httpStatus';

export function notFoundMiddleware(req: Request, res: Response): void {
  sendError(res, HTTP_STATUS.NOT_FOUND, `Route ${req.method} ${req.originalUrl} not found`);
}
