import { Request, Response } from 'express';
import { getStudentTimetable } from '../services/timetableService';
import { ERROR_MESSAGES } from '../constants/errors';

function parsePositiveInteger(value: unknown): number | undefined {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return undefined;
  }

  return parsed;
}

export function getStudentTimetableHandler(req: Request, res: Response): void {
  const studentId = parsePositiveInteger(req.params.id);

  if (studentId === undefined) {
    res.status(400).json({ message: ERROR_MESSAGES.invalidStudentId });
    return;
  }

  const result = getStudentTimetable(studentId);
  if (!result.ok) {
    res.status(404).json({ message: ERROR_MESSAGES.studentNotFound });
    return;
  }

  res.status(200).json(result.items);
}
