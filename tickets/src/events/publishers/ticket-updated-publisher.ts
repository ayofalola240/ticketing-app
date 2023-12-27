import { Publisher, Subjects, TicketUpdatedEvent } from '@e-mart/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
