import request from 'supertest';
import { createApp } from '../src/app';
import { seed } from '../src/db/seed';

describe('GET /courses', function coursesSuite() {
  beforeAll(function seedData() {
    seed({ silent: true });
  });

  it('returns all courses', async function getAllCoursesTest() {
    const app = createApp();

    const response = await request(app).get('/courses');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(500);
  });

  it('returns course fields required by the spec', async function courseFieldsTest() {
    const app = createApp();

    const response = await request(app).get('/courses');

    expect(response.status).toBe(200);
    const course = response.body[0];
    expect(course).toHaveProperty('id');
    expect(course).toHaveProperty('name');
    expect(course).toHaveProperty('credits');
    expect(course).toHaveProperty('capacity');
    expect(course).toHaveProperty('enrolled');
    expect(course).toHaveProperty('schedule');
  });

  it('filters courses by departmentId', async function filterByDepartmentTest() {
    const app = createApp();

    const response = await request(app).get('/courses?departmentId=1');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(50);
  });

  it('returns 400 for invalid departmentId', async function invalidDepartmentTest() {
    const app = createApp();

    const response = await request(app).get('/courses?departmentId=abc');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'departmentId는 양의 정수여야 합니다.' });
  });
});
