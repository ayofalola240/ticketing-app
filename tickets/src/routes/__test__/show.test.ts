import request from 'supertest';
import { app } from '../../app';
import { signin } from '../../test/setup';
import mongoose from 'mongoose';

it('return a 404 if the ticket is not found', async () => {
  // builtIn mongoose Id
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it('return a ticket if the ticket is found', async () => {
  const cookie = signin();
  const title = 'Any Title';
  const price = 200;

  const response = await request(app)
    .post('/api/tickets/')
    .set('Cookie', cookie)
    .send({
      title,
      price,
    })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
