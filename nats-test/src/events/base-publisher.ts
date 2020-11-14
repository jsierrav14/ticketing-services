import { clear } from 'console';
import { Stan } from 'node-nats-streaming'
import { resolve } from 'path';
import { Subjects } from './subjects'

interface Event {
    subject: Subjects;
    data: any;
}
export abstract class Publisher<T extends Event>{

    abstract subject: T['subject'];
    client: Stan;
    constructor(client: Stan) {
        this.client = client;
    }

    publish(data: T['data']) {

        return new Promise((resolve, reject) => {
            this.client.publish(this.subject, JSON.stringify(data), (err) => {

                if (err) {
                    return reject(err)
                }

                console.log('EVENT PUBLIC TO SUBJECT', this.subject)
                resolve();
            })
        })

    }

}