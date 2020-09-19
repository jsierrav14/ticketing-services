import express from 'express'
import 'express-async-errors'
import {json} from 'body-parser'
const app = express();
import {currentUserRouter} from './routes/current-user'
import {signInRouter} from './routes/signin'
import {signOutRouter} from './routes/signout'
import {signUpRouter} from './routes/signup'
import {errorHandler} from './middlewares/errors.middleware'
import { NotFoundError } from './errors/not-found-error';


app.use(json())

app.use(currentUserRouter);
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)

app.all('*',async (req, res, next)=>{
   throw new  NotFoundError();
})

app.use(errorHandler)
app.listen(3000, ()=>{
    console.log('Listen on port 3000!')
});