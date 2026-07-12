import { Response } from 'express';
import { ApiResponse } from '../interfaces/apiResponse.interface';

function envelope<T>(success: boolean, message: string, data: T | null, errors: unknown[] | null): ApiResponse<T> {
  return { success, message, data, errors, timestamp: new Date().toISOString() };
}

export function sendSuccess<T>(res: Response, status: number, message: string, data: T | null = null): Response {
  return res.status(status).json(envelope(true, message, data, null));
}

export function sendError(res: Response, status: number, message: string, errors: unknown[] | null = null): Response {
  return res.status(status).json(envelope(false, message, null, errors));
}
