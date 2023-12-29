import { Publisher, OrderCreatedEvent, Subjects } from '@e-mart/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
