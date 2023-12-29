import request from 'supertest';
import { app } from '../../app';
import { signin } from '../../test/setup';
import { Order } from '../../models/order';
import { Ticket } from '../../models/ticket';

it('fetches the order', async () => {
  const cookie = signin();
  // Create a ticket
  const ticket = Ticket.build({ title: 'Test Ticket', price: 20 });
  await ticket.save();
  // Make a request to buid an order with tis ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', cookie)
    .send({ ticketId: ticket.id })
    .expect(201);
  // make a request to fetch the order
  const { body: fetchOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', cookie)
    .expect(200);

  expect(fetchOrder.id).toEqual(order.id);
});

it('it ruturns an error if one user tries to fetch another users order', async () => {
  const user = signin();
  // Create a ticket
  const ticket = Ticket.build({ title: 'Test Ticket', price: 20 });
  await ticket.save();
  // Make a request to buid an order with tis ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);
  // make a request to fetch the order
  await request(app).get(`/api/orders/${order.id}`).set('Cookie', signin()).expect(401);
});
