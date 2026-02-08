import { Course } from '../types';
import { DAYS, PERIODS } from '../constants/schedule';
import { findStudentById } from '../repositories/studentRepository';
import { findEnrollmentsByStudentId } from '../repositories/enrollmentRepository';
import { findCourseById } from '../repositories/courseRepository';

type TimetableCourse = Pick<
  Course,
  'id' | 'name' | 'credits' | 'departmentId' | 'professorId' | 'schedule'
>;

export interface TimetableItem {
  enrollmentId: number;
  studentId: number;
  course: TimetableCourse;
  enrolledAt: Date;
}

type TimetableResult =
  | { ok: true; items: TimetableItem[] }
  | { ok: false; reason: 'student_not_found' };

const DAY_INDEX: Record<string, number> = DAYS.reduce<Record<string, number>>(
  (accumulator, day, index) => {
    accumulator[day] = index;
    return accumulator;
  },
  {}
);
const PERIOD_INDEX: Record<string, number> = PERIODS.reduce<Record<string, number>>(
  (accumulator, period, index) => {
    accumulator[String(period)] = index;
    return accumulator;
  },
  {}
);

function getSlotIndex(slot: string): number {
  const [day, period] = slot.split('_');
  const dayIndex = DAY_INDEX[day];
  const periodIndex = PERIOD_INDEX[period];

  if (dayIndex === undefined || periodIndex === undefined) {
    return Number.MAX_SAFE_INTEGER;
  }

  return dayIndex * PERIODS.length + periodIndex;
}

function getCourseOrderKey(schedule: string[]): number {
  if (schedule.length === 0) {
    return Number.MAX_SAFE_INTEGER;
  }

  return Math.min(...schedule.map(getSlotIndex));
}

export function getStudentTimetable(studentId: number): TimetableResult {
  const student = findStudentById(studentId);
  if (!student) {
    return { ok: false, reason: 'student_not_found' };
  }

  const enrollments = findEnrollmentsByStudentId(studentId);
  const items: TimetableItem[] = [];

  for (const enrollment of enrollments) {
    const course = findCourseById(enrollment.courseId);
    if (!course) {
      continue;
    }

    items.push({
      enrollmentId: enrollment.id,
      studentId: enrollment.studentId,
      course: {
        id: course.id,
        name: course.name,
        credits: course.credits,
        departmentId: course.departmentId,
        professorId: course.professorId,
        schedule: course.schedule,
      },
      enrolledAt: enrollment.enrolledAt,
    });
  }

  items.sort((first, second) => {
    const firstKey = getCourseOrderKey(first.course.schedule);
    const secondKey = getCourseOrderKey(second.course.schedule);

    if (firstKey !== secondKey) {
      return firstKey - secondKey;
    }

    if (first.course.id !== second.course.id) {
      return first.course.id - second.course.id;
    }

    return first.enrollmentId - second.enrollmentId;
  });

  return { ok: true, items };
}
