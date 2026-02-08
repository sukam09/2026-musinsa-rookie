import { Course } from '../types';
import {
  findAllCourses,
  findCoursesByDepartmentId,
} from '../repositories/courseRepository';

export function getCourses(departmentId?: number): Course[] {
  if (departmentId !== undefined) {
    return findCoursesByDepartmentId(departmentId);
  }

  return findAllCourses();
}
