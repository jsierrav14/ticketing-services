import express,{Request, Response} from 'express'
import {body,validationResult} from 'express-validator'

export default class AuthController {

    public signUp(req:Request, res:Response){
        
        const errors = validationResult(req);

        if(!errors.isEmpty()){
       
            const error = new Error('Invalid email or password')
           // error.reasons = errors.array();
            throw error;
        }
        const {email, password} = req.body;
  
        if(!email || typeof email !== 'string'){
            res.status(400).send('Provide a valid email') 
        }

        res.send({})
    }
    
}