import  request  from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server'
import moongose from "mongoose"
import app from '../app'
declare global {
    namespace NodeJS{
        interface Global{
             signup(): Promise<string[]>
        }
    }
}

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

global.signup = async ()=>{
    const email = "test@test.com"
    const password = "password"

    const response = await request(app)
    .post('/api/users/signup')
    .send({
        email, password
    })
    .expect(201)

    const cookie = response.get('Set-Cookie');
    return cookie
}