import request from 'supertest';
import app from '../src/app.js';
import code from '../src/tools/code.js';

describe('/api/format', () => {
  test('GET', async () => {
    const response = await request(app).get('/api/format').send();
    expect(response.statusCode).toBe(code.OK);
  });
});
