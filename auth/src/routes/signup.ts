import express from 'express'
import {body,validationResult} from 'express-validator'
import AuthController from '../controllers/auth.controller'

const router = express.Router();

const auth = new AuthController();

router.post('/api/users/signup',[
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .isLength({min:4, max:20})
    .withMessage('Password must be between 4 and 20 characters')
],auth.signUp)


export {router as signUpRouter}