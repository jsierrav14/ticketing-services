import {Response, Request} from 'express'


class OrdersController {


    async new(req:Request,res:Response){

        res.send({})
    }
}


export default OrdersController;