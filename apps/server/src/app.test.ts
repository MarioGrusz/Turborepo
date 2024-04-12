import { describe, test, expect } from 'vitest';
import supertest from 'supertest';
import app from './app.js';

describe('app', () => {
 test('responds with a not found message', async () => {
    const response = await supertest(app)
      .get('/what-is-this-even')
      .set('Accept', 'application/json');

    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toMatch(/text/);
 });
});


describe('GET /', () => {
    test('responds with json message', async () => {
        const response = await supertest(app)
         .get('/')
         .set('Accept', 'application/json');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toEqual({
            message: 'Bean Bazaar  - 👋🌎🌍🌏',
        });
         
    })
});