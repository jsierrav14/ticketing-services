import nats, { Message, Stan } from 'node-nats-streaming';
import { Subjects } from './subjects';
interface Event {
    subject: Subjects;
    data: any;
}
export declare abstract class Listener<T extends Event> {
    abstract subject: T['subject'];
    abstract queueGroupName: string;
    abstract onMessage(data: any, msg: Message): void;
    protected client: Stan;
    private ackWait;
    constructor(client: Stan);
    subscriptionOptions(): nats.SubscriptionOptions;
    listen(): void;
    parseMessage(msg: Message): any;
}
export {};
