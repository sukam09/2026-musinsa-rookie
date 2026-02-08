import { Router } from 'express';
import {
  createEnrollmentHandler,
  deleteEnrollmentHandler,
} from '../controllers/enrollmentController';

export function createEnrollmentRouter(): Router {
  const router = Router();

  router.post('/', createEnrollmentHandler);
  router.delete('/:id', deleteEnrollmentHandler);

  return router;
}
