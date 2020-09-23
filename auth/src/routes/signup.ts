import express from 'express'
import {body,validationResult} from 'express-validator'
import AuthController from '../controllers/auth.controller'
import {validateRequest} from '../middlewares/validate-request.middleware'

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
],validateRequest,auth.signUp)


export {router as signUpRouter}