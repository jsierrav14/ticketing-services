import { CustomError } from './custon-error';
export declare class NotFoundError extends CustomError {
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
