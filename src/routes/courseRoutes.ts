import { Router } from 'express';
import { getCoursesHandler } from '../controllers/courseController';

export function createCourseRouter(): Router {
  const router = Router();

  router.get('/', getCoursesHandler);

  return router;
}
