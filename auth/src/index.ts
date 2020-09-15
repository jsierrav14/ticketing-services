import express from 'express'
import {json} from 'body-parser'
const app = express();
import {currentUserRouter} from './routes/current-user'
import {signInRouter} from './routes/signin'
import {signOutRouter} from './routes/signout'
import {signUpRouter} from './routes/signup'
import {errorHandler} from './middlewares/errors.middleware'

app.use(json())

app.use(currentUserRouter);
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)

app.use(errorHandler)
app.listen(3000, ()=>{
    console.log('Listen on port 3000!')
});