import express, {Request,Response} from 'express'

const router = express.Router();

router.post('/api/orders', async(req:Request,res:Response)=>{

})

export {router as newOrderRouter}