import { Request, Response } from 'express';
import {
  createEnrollmentRequest,
  deleteEnrollmentRequest,
} from '../services/enrollmentService';
import { ERROR_MESSAGES } from '../constants/errors';

function parsePositiveInteger(value: unknown): number | undefined {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return undefined;
  }

  return parsed;
}

export function createEnrollmentHandler(req: Request, res: Response): void {
  const studentId = parsePositiveInteger(req.body?.studentId);
  const courseId = parsePositiveInteger(req.body?.courseId);

  if (studentId === undefined) {
    res.status(400).json({ message: ERROR_MESSAGES.invalidStudentId });
    return;
  }

  if (courseId === undefined) {
    res.status(400).json({ message: ERROR_MESSAGES.invalidCourseId });
    return;
  }

  const result = createEnrollmentRequest(studentId, courseId);

  if (!result.ok) {
    if (result.reason === 'student_not_found') {
      res.status(404).json({ message: ERROR_MESSAGES.studentNotFound });
      return;
    }

    if (result.reason === 'course_not_found') {
      res.status(404).json({ message: ERROR_MESSAGES.courseNotFound });
      return;
    }

    res.status(409).json({ message: ERROR_MESSAGES.enrollmentAlreadyExists });
    return;
  }

  res.status(201).json(result.enrollment);
}

export function deleteEnrollmentHandler(req: Request, res: Response): void {
  const enrollmentId = parsePositiveInteger(req.params.id);

  if (enrollmentId === undefined) {
    res.status(400).json({ message: ERROR_MESSAGES.invalidEnrollmentId });
    return;
  }

  const result = deleteEnrollmentRequest(enrollmentId);
  if (!result.ok) {
    if (result.reason === 'not_found') {
      res.status(404).json({ message: ERROR_MESSAGES.enrollmentNotFound });
      return;
    }

    res.status(404).json({ message: ERROR_MESSAGES.courseNotFound });
    return;
  }

  res.status(200).json(result.enrollment);
}
