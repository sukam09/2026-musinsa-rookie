import { Router } from 'express';
import { getProfessorsHandler } from '../controllers/professorController';

export function createProfessorRouter(): Router {
  const router = Router();

  router.get('/', getProfessorsHandler);

  return router;
}
