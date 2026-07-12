import rateLimit from 'express-rate-limit';
import { env } from '../config/env';
import { sendError } from '../utils/response.util';
import { HTTP_STATUS } from '../constants/httpStatus';

export const globalRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    sendError(res, HTTP_STATUS.TOO_MANY_REQUESTS, 'Too many requests, please try again later');
  },
});

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    sendError(res, HTTP_STATUS.TOO_MANY_REQUESTS, 'Too many auth attempts, please try again later');
  },
});
