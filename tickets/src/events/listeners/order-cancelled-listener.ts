import { Message } from 'node-nats-streaming';
import { Listener, OrderCancelledEvent, Subjects } from '@e-mart/common';
import { Ticket } from '../../models/tickets';
import { queueGroupName } from './queue-group-name';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);
    if (!ticket) {
      console.log('Ticket not found');
    } else {
      ticket.set({ orderId: undefined });

      await ticket.save();

      await new TicketUpdatedPublisher(this.client).publish({
        id: ticket.id,
        price: ticket.price,
        title: ticket.title,
        userId: ticket.userId,
        orderId: ticket.orderId,
        version: ticket.version,
      });

      msg.ack();
    }
  }
}
