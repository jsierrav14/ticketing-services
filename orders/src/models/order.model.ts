import mongoose from 'mongoose'
import {OrderStatus} from '@js-ecommerceapp/common'
import { TicketDoc } from './ticket.model';

export {OrderStatus};
interface OrderAttrs {
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
    ticket: TicketDoc;
}

interface OrderDoc extends mongoose.Document {
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
    ticket: TicketDoc;
}


interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    status:{
        type: String,
        required:true,
        enum:[OrderStatus.Complete,OrderStatus.AwaitingPayment,OrderStatus.Created],
        default:OrderStatus.Created
    },
    expiresAt:{
        type:mongoose.Schema.Types.Date
    },
    ticket:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ticket'
    
    }
},{
    toJSON:{
        transform(doc,ret){
            ret.id=ret._id
            delete ret._id
        }
    }
})
orderSchema.static('build',(attrs : OrderAttrs)=>{
    return new Order(attrs)
})

const Order = mongoose.model<OrderDoc,OrderModel>('Order',orderSchema);

export { Order}