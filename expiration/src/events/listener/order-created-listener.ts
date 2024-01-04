import { Listener, OrderCreatedEvent, Subjects } from '@e-mart/common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { expirationQueue } from '../../queses/expiration-queue';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log('waiting delay: ', delay);
    await expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay,
      },
    );

    msg.ack();
  }
}
