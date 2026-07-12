import { Router } from 'express';
import { sendSuccess } from '../utils/response.util';

const router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Liveness/readiness probe
 *     tags: [Health]
 */
router.get('/', (_req, res) => {
  sendSuccess(res, 200, 'AssetFlow API is healthy', { uptime: process.uptime() });
});

export default router;
