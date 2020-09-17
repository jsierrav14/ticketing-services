import { NextFunction, Request, Response } from "express";
import { RequestValidationError } from '../errors/request-validation-error'
import { DatabaseConnectionError } from '../errors/database-connection-error'


export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction) => {


    if (err instanceof RequestValidationError) {
    

        return res.status(400).send({errors:err.serealizeErrors()})
    }

    if (err instanceof DatabaseConnectionError) {
        return res.status(500).send({errors:err.serealizeErrors()})
    }
    res.status(400).send({
       errors:[
           {
               message:'something went wrong'
           }
       ]
    })
}