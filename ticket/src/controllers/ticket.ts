import express, {Request, Response} from 'express'

class TicketController {


    newTicket(req:Request,res:Response){
        
        res.sendStatus(200)
    }

}


export default TicketController;