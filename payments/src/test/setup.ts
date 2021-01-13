import  request  from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server'
import moongose from "mongoose"
import jwt from 'jsonwebtoken'
import app from '../app'
declare global {
    namespace NodeJS{
        interface Global{
             signin(userId?:string):string[]
        }
    }
}
jest.mock('../nats.wrapper');

process.env.STRIPE_KEY ='sk_test_51I8YkLBH3BmD4OJRYD57bGFMxs3nDJVNM98rWCWaLRQnKRB9r2jDxhAu8TrUUSPpHo8m67e6rgWzB88Q6IZ4iG6T00TBJ7YDgT'
let mongo:any;

beforeAll(async () => {

    process.env.jwt = "asdsasdasd";
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();
    await moongose.connect(mongoUri, {
      useNewUrlParser:true,
      useUnifiedTopology:true
    })
})

beforeEach(async()=>{
    const collections = await moongose.connection.db.collections();
    for(let collection of collections){
        await collection.deleteMany({})
    }
})

afterAll(async()=>{
    await mongo.stop();
    await moongose.connection.close();
})


global.signin = (id?:string)=>{

    const payload={
        id:id||new moongose.Types.ObjectId().toHexString(),
        email:'test@test.com'
    }


    const token = jwt.sign(payload,process.env.jwt!)

    const session ={jwt:token}

    const sessionJSON = JSON.stringify(session)

    const base64= Buffer.from(sessionJSON).toString('base64')

    return [`express:sess=${base64}`]
}