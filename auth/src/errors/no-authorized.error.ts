import {CustomError} from './custon-error'

export class NotAuthorizedError extends CustomError {
    statusCode = 401;

    constructor(){
        super("Not authorized");

        Object.setPrototypeOf(this,NotAuthorizedError)
    }
    serializeErrors(){
        return[{
            message:'Not authorized'
        }]
    }
}