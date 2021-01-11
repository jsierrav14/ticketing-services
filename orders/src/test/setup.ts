import  request  from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server'
import moongose from "mongoose"
import jwt from 'jsonwebtoken'
import app from '../app'
declare global {
    namespace NodeJS{
        interface Global{
             signin():string[]
        }
    }
}
jest.mock('../nats.wrapper');

let mongo:any;

beforeAll(async () => {
    jest.clearAllMocks()
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


global.signin = ()=>{

    const payload={
        id:new moongose.Types.ObjectId().toHexString(),
        email:'test@test.com'
    }


    const token = jwt.sign(payload,process.env.jwt!)

    const session ={jwt:token}

    const sessionJSON = JSON.stringify(session)

    const base64= Buffer.from(sessionJSON).toString('base64')

    return [`express:sess=${base64}`]
}