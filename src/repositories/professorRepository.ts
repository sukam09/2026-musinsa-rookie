import { db } from '../db/database';
import { Professor } from '../types';

export function findAllProfessors(): Professor[] {
  return Array.from(db.professors.values());
}

export function findProfessorById(id: number): Professor | undefined {
  return db.professors.get(id);
}

export function findProfessorsByDepartmentId(departmentId: number): Professor[] {
  return Array.from(db.professors.values()).filter(
    professor => professor.departmentId === departmentId
  );
}

export function createProfessor(professor: Professor): Professor {
  db.professors.set(professor.id, professor);
  return professor;
}
