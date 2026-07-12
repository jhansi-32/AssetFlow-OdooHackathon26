import cron from 'node-cron';
import { logger } from '../utils/logger';

// Scheduler bootstrap. Actual jobs (overdue-return sweeps, booking reminders,
// maintenance SLA checks) get registered here once their modules exist.
export function registerJobs(): void {
  cron.schedule('0 * * * *', () => {
    logger.debug('Hourly job tick — no jobs registered yet');
  });

  logger.info('Cron scheduler initialized');
}
