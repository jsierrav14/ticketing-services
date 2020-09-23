import express from 'express'
import {body,validationResult} from 'express-validator'
import {validateRequest} from '../middlewares/validate-request.middleware'
import AuthController from '../controllers/auth.controller'
const router = express.Router();
const auth = new AuthController();
router.post('/api/users/signin',[
  body('email').isEmail().withMessage('Email  must be valid'), 
  body('password').trim().notEmpty().withMessage('You must supply a password')],
  validateRequest,
auth.signIn)


export {router as signInRouter}