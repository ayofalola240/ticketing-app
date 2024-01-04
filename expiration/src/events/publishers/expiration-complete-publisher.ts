import { Subjects, Publisher, ExpirationCompleteEvent } from '@e-mart/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
