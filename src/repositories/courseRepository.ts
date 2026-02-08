import { db } from '../db/database';
import { Course } from '../types';

export function findAllCourses(): Course[] {
  return Array.from(db.courses.values());
}

export function findCourseById(id: number): Course | undefined {
  return db.courses.get(id);
}

export function findCoursesByProfessorId(professorId: number): Course[] {
  return Array.from(db.courses.values()).filter(
    course => course.professorId === professorId
  );
}

export function findCoursesByDepartmentId(departmentId: number): Course[] {
  return Array.from(db.courses.values()).filter(
    course => course.departmentId === departmentId
  );
}

export function createCourse(course: Course): Course {
  db.courses.set(course.id, course);
  return course;
}

export function updateCourse(course: Course): Course {
  db.courses.set(course.id, course);
  return course;
}
