import app from '../src/app.js';
import code from '../src/tools/code.js';
import dotenv from 'dotenv';
import request from 'supertest';
import { signToken } from '../src/security/jwt.js';

dotenv.config();

const KEY = {
  USERNAME: process.env.AUTH_USERNAME,
  PASSWORD: process.env.AUTH_PASSWORD,
};
const AUTHORIZATION_HEADER = `Basic ${Buffer.from(
  `${KEY.USERNAME}:${KEY.PASSWORD}`
).toString('base64')}`;

let token;

beforeAll(async () => {
  const user = {
    username: 'test',
    password: 'test123',
  };
  const signUp = await request(app)
    .post('/api/signup')
    .set('Authorization', AUTHORIZATION_HEADER)
    .send(user);
  token = await signToken(signUp.body.id);
});

describe('/api/role', () => {
  const role = {
    name: 'Test',
  };
  test('POST', async () => {
    const response = await request(app).post('/api/role').send(role);
    console.log(response);
    expect(response.statusCode).toBe(code.OK);
  });
});

describe('/api/group', () => {});

describe('/api/semester', () => {});

describe('/api/tutor', () => {});

describe('/api/user', () => {});

describe('/api/partial', () => {});

describe('/api/propadeuticarea', () => {});

describe('/api/student', () => {});

describe('/api/subject', () => {});

describe('/api/grade', () => {});

describe('/api/teacher', () => {});
