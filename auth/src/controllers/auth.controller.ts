import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { BadRequestError } from '@js-ecommerceapp/common'
import { User } from '../models/user';
import { Password } from '../services/password';

export default class AuthController {

    public async signUp(req: Request, res: Response) {

    

        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            throw new BadRequestError('Email in use')
        }

        const user = User.build({ email, password })

        await user.save();


        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.jwt!)


        req.session = { jwt: userJwt };


        res.status(201).send(user)
    }

    public async signIn(req:Request, res:Response){

         const {email, password} = req.body;

         const existingUser = await User.findOne({email})
         if(!existingUser){
            throw new BadRequestError('Invalid credentials')

         }


         const passwordsMatch = await Password.compare(existingUser.password,password);

         if(!passwordsMatch){
            throw new BadRequestError('Invalid credentials')

         }

         const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, process.env.jwt!)


        req.session = { jwt: userJwt };


        res.status(200).send(existingUser)
      
    }

    public async getCurrentUser(req:Request, res:Response){
      res.send({currentUser:req.currentUser!})
    }

    public async singOut(req:Request, res:Response){
 
        req.session = null;

        res.send({})
    }

}