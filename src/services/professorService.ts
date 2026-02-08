import { Professor } from '../types';
import {
  findAllProfessors,
  findProfessorsByDepartmentId,
} from '../repositories/professorRepository';

export function getProfessors(departmentId?: number): Professor[] {
  if (departmentId !== undefined) {
    return findProfessorsByDepartmentId(departmentId);
  }

  return findAllProfessors();
}
