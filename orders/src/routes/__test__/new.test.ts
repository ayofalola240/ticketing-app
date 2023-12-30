import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { signin } from '../../test/setup';
import { Order } from '../../models/order';
import { Ticket } from '../../models/ticket';
import { OrderStatus } from '../../models/order';
import { natsWrapper } from '../../nats-wrapper';

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
    id: new mongoose.Types.ObjectId().toHexString(),
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
    id: new mongoose.Types.ObjectId().toHexString(),
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

it('emits an order created event', async () => {
  const cookie = signin();
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
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
  // expect(natsWrapper.client.publish).not.toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
