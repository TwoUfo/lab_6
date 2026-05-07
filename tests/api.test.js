const request = require('supertest');
const app = require('../src/index');

describe('LocalService API', () => {
  test('GET / returns running message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('LocalService API is running');
  });

  test('GET /health returns status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body).toHaveProperty('uptime');
    expect(res.body).toHaveProperty('timestamp');
  });

  test('GET /specialists returns list of 3 specialists', async () => {
    const res = await request(app).get('/specialists');
    expect(res.statusCode).toBe(200);
    expect(res.body.specialists).toHaveLength(3);
    expect(res.body.specialists[0]).toHaveProperty('id');
    expect(res.body.specialists[0]).toHaveProperty('name');
    expect(res.body.specialists[0]).toHaveProperty('category');
    expect(res.body.specialists[0]).toHaveProperty('rating');
  });

  test('POST /orders with valid data creates order with status pending', async () => {
    const res = await request(app)
      .post('/orders')
      .send({
        specialistId: 1,
        clientName: 'Тестовий Клієнт',
        scheduledAt: '2024-12-01T10:00:00Z',
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.order).toHaveProperty('id');
    expect(res.body.order.status).toBe('pending');
    expect(res.body.order.specialistId).toBe(1);
    expect(res.body.order.clientName).toBe('Тестовий Клієнт');
  });

  test('POST /orders without body returns 400', async () => {
    const res = await request(app).post('/orders').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('POST /orders with partial data returns 400', async () => {
    const res = await request(app)
      .post('/orders')
      .send({ specialistId: 1 });
    expect(res.statusCode).toBe(400);
  });
});
