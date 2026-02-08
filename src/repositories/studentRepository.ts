import { db } from '../db/database';
import { Student } from '../types';

export function findAllStudents(): Student[] {
  return Array.from(db.students.values());
}

export function findStudentById(id: number): Student | undefined {
  return db.students.get(id);
}

export function findStudentsByDepartmentId(departmentId: number): Student[] {
  return Array.from(db.students.values()).filter(
    student => student.departmentId === departmentId
  );
}

export function createStudent(student: Student): Student {
  db.students.set(student.id, student);
  return student;
}
