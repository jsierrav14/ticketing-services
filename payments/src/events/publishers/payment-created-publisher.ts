import {Subjects, Publisher, PaymentCreatedEvent} from '@js-ecommerceapp/common'

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {

    subject: Subjects.PaymentCreated = Subjects.PaymentCreated
}