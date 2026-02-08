import { Request, Response } from 'express';
import { getStudents } from '../services/studentService';
import { ERROR_MESSAGES } from '../constants/errors';

function parseDepartmentId(value: unknown): number | undefined {
  if (value === undefined) {
    return undefined;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return undefined;
  }

  return parsed;
}

export function getStudentsHandler(req: Request, res: Response): void {
  const departmentIdParam = parseDepartmentId(req.query.departmentId);

  if (req.query.departmentId !== undefined && departmentIdParam === undefined) {
    res.status(400).json({ message: ERROR_MESSAGES.invalidDepartmentId });
    return;
  }

  const students = getStudents(departmentIdParam);
  res.status(200).json(students);
}
