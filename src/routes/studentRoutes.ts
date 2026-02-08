import { Router } from 'express';
import { getStudentsHandler } from '../controllers/studentController';
import { getStudentTimetableHandler } from '../controllers/timetableController';

export function createStudentRouter(): Router {
  const router = Router();

  router.get('/', getStudentsHandler);
  router.get('/:id/enrollments', getStudentTimetableHandler);

  return router;
}
