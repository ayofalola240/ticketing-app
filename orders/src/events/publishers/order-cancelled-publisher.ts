import { Publisher, OrderCancelledEvent, Subjects } from '@e-mart/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
