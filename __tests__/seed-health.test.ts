import request from 'supertest';
import { createApp } from '../src/app';
import { seed } from '../src/db/seed';

describe('Seed and health readiness', function seedHealthSuite() {
  it('completes seeding within 1 minute and serves health', async function seedHealthTest() {
    const startAt = Date.now();
    seed({ silent: true });
    const elapsedMs = Date.now() - startAt;

    expect(elapsedMs).toBeLessThan(60_000);

    const app = createApp();
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });
});
