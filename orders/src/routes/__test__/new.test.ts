import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { signin } from '../../test/setup';

it('can only be access if a user is signed in', async () => {
  await request(app).post('/api/orders').send({}).expect(401);
});

it('returns an error if the ticket does not exist', async () => {
  const cookie = signin();
  const ticketId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .post('/api/orders')
    .set('Cookie', cookie)
    .send({
      ticketId,
    })
    .expect(404);
});

it('returns an error if the ticket is already resevered', async () => {});

it('returns a ticket', async () => {});
