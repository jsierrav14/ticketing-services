import {Publisher,Subjects,TicketCreatedEvent} from '@js-ecommerceapp/common'


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;

}

