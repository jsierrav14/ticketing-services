import express from 'express'
import AuthController from '../controllers/auth.controller'
import {currentUser} from '../middlewares/current-user.middleware'
const router = express.Router();


const auth = new AuthController();
router.get('/api/users/currentuser',currentUser,auth.getCurrentUser)


export {router as currentUserRouter}