import request from 'supertest';
import { createApp } from '../src/app';
import { seed } from '../src/db/seed';

describe('POST /enrollments', function enrollmentsSuite() {
  beforeAll(function seedData() {
    seed({ silent: true });
  });

  it('creates an enrollment', async function createEnrollmentTest() {
    const app = createApp();

    const response = await request(app)
      .post('/enrollments')
      .send({ studentId: 1, courseId: 1 });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toMatchObject({ studentId: 1, courseId: 1 });
    expect(response.body).toHaveProperty('enrolledAt');
  });

  it('returns 409 for duplicate enrollment', async function duplicateEnrollmentTest() {
    const app = createApp();

    await request(app).post('/enrollments').send({ studentId: 2, courseId: 2 });
    const response = await request(app)
      .post('/enrollments')
      .send({ studentId: 2, courseId: 2 });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({ message: '이미 수강신청된 강좌입니다.' });
  });

  it('returns 404 when student does not exist', async function studentNotFoundTest() {
    const app = createApp();

    const response = await request(app)
      .post('/enrollments')
      .send({ studentId: 999999, courseId: 3 });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: '학생을 찾을 수 없습니다.' });
  });

  it('returns 404 when course does not exist', async function courseNotFoundTest() {
    const app = createApp();

    const response = await request(app)
      .post('/enrollments')
      .send({ studentId: 3, courseId: 999999 });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: '강좌를 찾을 수 없습니다.' });
  });

  it('returns 400 for invalid body', async function invalidBodyTest() {
    const app = createApp();

    const response = await request(app)
      .post('/enrollments')
      .send({ studentId: 'abc', courseId: 0 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'studentId는 양의 정수여야 합니다.' });
  });
});

describe('DELETE /enrollments/:id', function deleteEnrollmentsSuite() {
  beforeAll(function seedData() {
    seed({ silent: true });
  });

  it('deletes an enrollment', async function deleteEnrollmentTest() {
    const app = createApp();

    const createResponse = await request(app)
      .post('/enrollments')
      .send({ studentId: 10, courseId: 10 });

    const response = await request(app).delete(`/enrollments/${createResponse.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ studentId: 10, courseId: 10 });
  });

  it('returns 404 when enrollment does not exist', async function enrollmentNotFoundTest() {
    const app = createApp();

    const response = await request(app).delete('/enrollments/999999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: '수강신청을 찾을 수 없습니다.' });
  });

  it('returns 400 for invalid id', async function invalidIdTest() {
    const app = createApp();

    const response = await request(app).delete('/enrollments/abc');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'enrollmentId는 양의 정수여야 합니다.' });
  });
});
