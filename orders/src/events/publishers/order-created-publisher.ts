import { Publisher, OrderCreateEvent, Subjects } from '@js-ecommerceapp/common'

export class OrderCreatedPublisher extends Publisher<OrderCreateEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated
}

