import { Router } from 'express';
import authRoutes from './auth.routes';
import healthRoutes from './health.routes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);

// Business modules (departments, categories, employees, assets, allocations,
// bookings, maintenance, audits, reports, notifications) are intentionally
// NOT wired here yet — this is the auth/RBAC foundation only.

export default router;
