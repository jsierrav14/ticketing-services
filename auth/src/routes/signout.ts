import express from 'express'
import AuthController from '../controllers/auth.controller'

const router = express.Router();

const auth = new AuthController();
router.post('/api/users/signout',auth.singOut)


export {router as signOutRouter}