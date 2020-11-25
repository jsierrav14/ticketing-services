import {Publisher,Subjects,TicketCreatedEvent, TicketUpdatedEvent} from "@js-ecommerceapp/common"


export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject:Subjects.TicketUpdated = Subjects.TicketUpdated
}