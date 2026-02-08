import { db } from '../db/database';
import { Enrollment } from '../types';

export function findAllEnrollments(): Enrollment[] {
  return Array.from(db.enrollments.values());
}

export function findEnrollmentById(id: number): Enrollment | undefined {
  return db.enrollments.get(id);
}

export function findEnrollmentsByStudentId(studentId: number): Enrollment[] {
  return Array.from(db.enrollments.values()).filter(
    enrollment => enrollment.studentId === studentId
  );
}

export function findEnrollmentsByCourseId(courseId: number): Enrollment[] {
  return Array.from(db.enrollments.values()).filter(
    enrollment => enrollment.courseId === courseId
  );
}

export function findEnrollmentByStudentAndCourse(
  studentId: number,
  courseId: number
): Enrollment | undefined {
  return Array.from(db.enrollments.values()).find(
    enrollment => enrollment.studentId === studentId && enrollment.courseId === courseId
  );
}

export function createEnrollment(enrollment: Enrollment): Enrollment {
  db.enrollments.set(enrollment.id, enrollment);
  return enrollment;
}

export function deleteEnrollment(id: number): boolean {
  return db.enrollments.delete(id);
}

export function getNextEnrollmentId(): number {
  const ids = Array.from(db.enrollments.keys());
  return ids.length === 0 ? 1 : Math.max(...ids) + 1;
}
