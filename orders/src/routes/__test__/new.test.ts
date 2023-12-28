import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { signin } from '../../test/setup';
import { Order } from '../../models/order';
import { Ticket } from '../../models/ticket';
import { OrderStatus } from '../../models/order';

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

it('returns an error if the ticket is already resevered', async () => {
  const cookie = signin();
  const ticket = Ticket.build({
    title: 'Concert Ticket',
    price: 20,
  });
  await ticket.save();
  const order = Order.build({
    ticket,
    userId: 'ee0errjdkdor',
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', cookie)
    .send({
      ticket: ticket.id,
    })
    .expect(400);
});

it('returns a ticket', async () => {
  const cookie = signin();
  const ticket = Ticket.build({
    title: 'Concert Ticket',
    price: 20,
  });
  await ticket.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', cookie)
    .send({
      ticketId: ticket.id,
    })
    .expect(201);
});

it.todo('emits an order created event');
