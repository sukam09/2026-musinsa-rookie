import request from 'supertest';
import { createApp } from '../src/app';

describe('GET /health', function healthSuite() {
  it('returns 200 and status ok', async function healthTest() {
    const app = createApp();

    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });
});
