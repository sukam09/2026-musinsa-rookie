import { Router } from 'express';
import { getStudentsHandler } from '../controllers/studentController';

export function createStudentRouter(): Router {
  const router = Router();

  router.get('/', getStudentsHandler);

  return router;
}
