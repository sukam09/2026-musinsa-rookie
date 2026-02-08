import { Enrollment } from '../types';
import { findStudentById } from '../repositories/studentRepository';
import { findCourseById, updateCourse } from '../repositories/courseRepository';
import {
  createEnrollment,
  findEnrollmentByStudentAndCourse,
  getNextEnrollmentId,
} from '../repositories/enrollmentRepository';

type CreateEnrollmentResult =
  | { ok: true; enrollment: Enrollment }
  | { ok: false; reason: 'student_not_found' | 'course_not_found' | 'duplicate' };

export function createEnrollmentRequest(
  studentId: number,
  courseId: number
): CreateEnrollmentResult {
  const student = findStudentById(studentId);
  if (!student) {
    return { ok: false, reason: 'student_not_found' };
  }

  const course = findCourseById(courseId);
  if (!course) {
    return { ok: false, reason: 'course_not_found' };
  }

  const existing = findEnrollmentByStudentAndCourse(studentId, courseId);
  if (existing) {
    return { ok: false, reason: 'duplicate' };
  }

  const enrollment: Enrollment = {
    id: getNextEnrollmentId(),
    studentId,
    courseId,
    enrolledAt: new Date(),
  };

  createEnrollment(enrollment);
  updateCourse({ ...course, enrolled: course.enrolled + 1 });

  return { ok: true, enrollment };
}
