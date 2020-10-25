import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import { errorHandler,NotFoundError ,currentUser} from '@js-ecommerceapp/common'
import {createTicketRouter} from './routes/new'
const app = express();

app.use(json())
app.set('trust proxy',true);

app.use(
    cookieSession({
        signed:false,
        secure:process.env.NODE_ENV !=='test'
    })
)
app.use(currentUser)
app.use(createTicketRouter)

app.all('*', async (req, res, next) => {
    throw new NotFoundError();
})

app.use(errorHandler)

export default app