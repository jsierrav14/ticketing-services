import express from 'express'
import {json} from 'body-parser'
const app = express();
app.use(json())

app.get('/api/users/currentuser/',(req, res)=>{
  res.send('Welcome')
})

app.listen(3000, ()=>{
    console.log('Listen on port 3000!')
});