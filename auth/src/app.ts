import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'

import { currentUserRouter } from './routes/current-user'
import { signInRouter } from './routes/signin'
import { signOutRouter } from './routes/signout'
import { signUpRouter } from './routes/signup'
import { errorHandler } from './middlewares/errors.middleware'
import { NotFoundError } from './errors/not-found-error';

const app = express();

app.use(json())
app.set('trust proxy',true);

app.use(
    cookieSession({
        signed:false,
        secure:true
    })
)
app.use(currentUserRouter);
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)

app.all('*', async (req, res, next) => {
    throw new NotFoundError();
})

app.use(errorHandler)

export default app