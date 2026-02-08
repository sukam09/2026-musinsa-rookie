import { Router } from 'express';
import { createEnrollmentHandler } from '../controllers/enrollmentController';

export function createEnrollmentRouter(): Router {
  const router = Router();

  router.post('/', createEnrollmentHandler);

  return router;
}
