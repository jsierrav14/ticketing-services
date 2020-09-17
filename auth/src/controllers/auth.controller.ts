import express,{Request, Response} from 'express'
import {body,validationResult} from 'express-validator'
import {RequestValidationError} from '../errors/request-validation-error'
import {DatabaseConnectionError} from '../errors/database-connection-error'

export default class AuthController {

    public signUp(req:Request, res:Response){
        
        const errors = validationResult(req);

        if(!errors.isEmpty()){
       
           throw new RequestValidationError(errors.array())
        }
        const {email, password} = req.body;
  
        if(!email || typeof email !== 'string'){
            res.status(400).send('Provide a valid email') 
        }
        throw new DatabaseConnectionError()

        res.send({})
    }
    
}