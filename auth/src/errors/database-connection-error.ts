import {CustomError} from './custon-error'

export class DatabaseConnectionError extends CustomError {

    statusCode=500;
    reason = "Database error connection"
    constructor(){
     super('Error connecting to db')
     Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors(){
        return [
            {
                message: this.reason
            }
        ]
    }
}