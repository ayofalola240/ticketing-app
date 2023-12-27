import { Publisher, Subjects, TicketCreatedEvent } from '@e-mart/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
