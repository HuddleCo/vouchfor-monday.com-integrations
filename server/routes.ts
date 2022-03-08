import { Application } from 'express';

import healthRouter from './api/controllers/health/router';
import webhookRouter from './api/controllers/webhook/router';

export default function routes(app: Application): void {
  app.use('/api/v1/health', healthRouter);
  app.use('/api/v1/webhook', webhookRouter);
}
