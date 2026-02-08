import request from 'supertest';
import { createApp } from '../src/app';
import { seed } from '../src/db/seed';
import { DAYS, PERIODS } from '../src/constants/schedule';

function getSlotIndex(slot: string): number {
  const [day, period] = slot.split('_');
  const dayIndex = DAYS.indexOf(day as (typeof DAYS)[number]);
  const periodIndex = PERIODS.indexOf(Number(period) as (typeof PERIODS)[number]);

  if (dayIndex === -1 || periodIndex === -1) {
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

describe('GET /students/:id/enrollments', function timetableSuite() {
  beforeAll(function seedData() {
    seed({ silent: true });
  });

  it('returns 400 for invalid student id', async function invalidStudentIdTest() {
    const app = createApp();

    const response = await request(app).get('/students/abc/enrollments');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'studentId는 양의 정수여야 합니다.' });
  });

  it('returns 404 when student does not exist', async function studentNotFoundTest() {
    const app = createApp();

    const response = await request(app).get('/students/999999/enrollments');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: '학생을 찾을 수 없습니다.' });
  });

  it('returns empty array when student has no enrollments', async function emptyTimetableTest() {
    const app = createApp();

    const response = await request(app).get('/students/5000/enrollments');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('returns timetable items sorted by schedule order', async function timetableOrderTest() {
    const app = createApp();

    const coursesResponse = await request(app).get('/courses');
    const courses = coursesResponse.body as Array<{
      id: number;
      schedule: string[];
    }>;

    const sortedCourses = [...courses].sort((first, second) => {
      return getCourseOrderKey(first.schedule) - getCourseOrderKey(second.schedule);
    });

    const earliestCourse = sortedCourses[0];
    const latestCourse = sortedCourses[sortedCourses.length - 1];

    const studentId = 5001;
    await request(app)
      .post('/enrollments')
      .send({ studentId, courseId: latestCourse.id });
    await request(app)
      .post('/enrollments')
      .send({ studentId, courseId: earliestCourse.id });

    const response = await request(app).get(`/students/${studentId}/enrollments`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].course.id).toBe(earliestCourse.id);
    expect(response.body[1].course.id).toBe(latestCourse.id);
  });
});
