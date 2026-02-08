import request from 'supertest';
import { createApp } from '../src/app';
import { seed } from '../src/db/seed';

describe('GET /professors', function professorsSuite() {
  beforeAll(function seedData() {
    seed({ silent: true });
  });

  it('returns all professors', async function getAllProfessorsTest() {
    const app = createApp();

    const response = await request(app).get('/professors');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(100);
  });

  it('filters professors by departmentId', async function filterByDepartmentTest() {
    const app = createApp();

    const response = await request(app).get('/professors?departmentId=1');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(10);
  });

  it('returns 400 for invalid departmentId', async function invalidDepartmentTest() {
    const app = createApp();

    const response = await request(app).get('/professors?departmentId=abc');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'departmentId는 양의 정수여야 합니다.' });
  });
});
