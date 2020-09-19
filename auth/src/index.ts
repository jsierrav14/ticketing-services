import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose';
import { json } from 'body-parser'
const app = express();
import { currentUserRouter } from './routes/current-user'
import { signInRouter } from './routes/signin'
import { signOutRouter } from './routes/signout'
import { signUpRouter } from './routes/signup'
import { errorHandler } from './middlewares/errors.middleware'
import { NotFoundError } from './errors/not-found-error';


app.use(json())

app.use(currentUserRouter);
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)

app.all('*', async (req, res, next) => {
    throw new NotFoundError();
})

app.use(errorHandler)

const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: false,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('connected')
    } catch (err) {
        console.log(err)
    }

}
app.listen(3000, () => {
    console.log('Listen on port 3000!')
});

start()