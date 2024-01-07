import request from 'supertest';
import app from '../src/app.js';
import code from '../src/tools/code.js';

describe('/grade', () => {
  test('POST', async () => {});
  test('PUT ', async () => {});
  test('GET', async () => {
    const response = await request(app).get('/api/grade').send();
    expect(response.statusCode).toBe(code.OK);
  });
});
