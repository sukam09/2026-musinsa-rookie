import { db } from '../db/database';
import { Department } from '../types';

export function findAllDepartments(): Department[] {
  return Array.from(db.departments.values());
}

export function findDepartmentById(id: number): Department | undefined {
  return db.departments.get(id);
}

export function createDepartment(department: Department): Department {
  db.departments.set(department.id, department);
  return department;
}
