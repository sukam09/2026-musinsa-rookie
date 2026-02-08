import request from 'supertest';
import { createApp } from '../src/app';
import { seed } from '../src/db/seed';

describe('GET /students', function studentsSuite() {
  beforeAll(function seedData() {
    seed({ silent: true });
  });

  it('returns all students', async function getAllStudentsTest() {
    const app = createApp();

    const response = await request(app).get('/students');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(10000);
  });

  it('filters students by departmentId', async function filterByDepartmentTest() {
    const app = createApp();

    const response = await request(app).get('/students?departmentId=1');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1000);
  });

  it('returns 400 for invalid departmentId', async function invalidDepartmentTest() {
    const app = createApp();

    const response = await request(app).get('/students?departmentId=abc');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'departmentId는 양의 정수여야 합니다.' });
  });
});
