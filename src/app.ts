import express, { Application } from 'express';
import { createStudentRouter } from './routes/studentRoutes';

export function createApp(): Application {
  const app = express();

  app.use(express.json());
  app.use('/students', createStudentRouter());

  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  return app;
}
