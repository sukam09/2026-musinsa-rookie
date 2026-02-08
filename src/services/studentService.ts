import { Student } from '../types';
import {
  findAllStudents,
  findStudentsByDepartmentId,
} from '../repositories/studentRepository';

export function getStudents(departmentId?: number): Student[] {
  if (departmentId !== undefined) {
    return findStudentsByDepartmentId(departmentId);
  }

  return findAllStudents();
}
