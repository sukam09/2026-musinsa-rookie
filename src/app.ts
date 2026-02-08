import express, { Application } from 'express';
import { createStudentRouter } from './routes/studentRoutes';
import { createProfessorRouter } from './routes/professorRoutes';
import { createCourseRouter } from './routes/courseRoutes';
import { createEnrollmentRouter } from './routes/enrollmentRoutes';

export function createApp(): Application {
  const app = express();

  app.use(express.json());
  app.use('/students', createStudentRouter());
  app.use('/professors', createProfessorRouter());
  app.use('/courses', createCourseRouter());
  app.use('/enrollments', createEnrollmentRouter());

  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  return app;
}
