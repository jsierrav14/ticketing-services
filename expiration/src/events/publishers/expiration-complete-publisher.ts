import {Subjects,Publisher,ExpirationCompleteEvent} from '@js-ecommerceapp/common'
export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}