import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import { RequestValidationError } from '../errors/request-validation-error'
import { BadRequestError } from '../errors/bad-request-error'
import { User } from '../models/user';


export default class AuthController {

    public async signUp(req: Request, res: Response) {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array())
        }

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

}