import Controller from "@/utils/interfaces/controller.interface";
import { NextFunction, Request, Response, Router } from "express";

import validationMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/ticket/ticket.validation";
import { RequestType } from "requestType";
import HttpException from "@/utils/exceptions/http.exception";
import authenticatedAdminMiddleware from "@/middleware/authenticatedAdmin.middleware";
import authenticatedMiddleware from "@/middleware/authenticated.middleware";
import TicketService from "./ticket.service";






class TicketController implements Controller {
    public path = '/ticket';
    public router = Router();
    private TicketService = new TicketService();


    constructor(){
        this.initialiseRoutes();
    }

    private initialiseRoutes():void {
        this.router.post(
            `${this.path}/create`, 
            [authenticatedMiddleware, validationMiddleware(validate.createTicket, RequestType.BODY)],
            this.create
        )

        this.router.patch(
            `${this.path}/update`, [authenticatedMiddleware,  validationMiddleware(validate.updateTicket, RequestType.BODY)], this.updateTicket
        )

        this.router.get(
            `${this.path}/get/:id`, [authenticatedMiddleware,  validationMiddleware(validate.mutateTicketParams, RequestType.PARAMS)], this.getTicket
        )
        this.router.get(
            `${this.path}/get-by-status/:id`, [authenticatedMiddleware,  validationMiddleware(validate.mutateTicketParams, RequestType.PARAMS)], this.getTicketByStatus
        )

        this.router.get(
            `${this.path}/get-by-priority/:id`, [authenticatedMiddleware,  validationMiddleware(validate.mutateTicketParams, RequestType.PARAMS)], this.getTicketByPriority
        )

        this.router.get(
            `${this.path}/user/`, [authenticatedMiddleware], this.getUserTicket
        )

        this.router.post(
            `${this.path}/reply`, [authenticatedMiddleware, validationMiddleware(validate.replyTicket, RequestType.BODY)], this.replyTicket
        )
        
        this.router.delete(
            `${this.path}/remove/:id`, [authenticatedMiddleware,  validationMiddleware(validate.mutateTicketParams, RequestType.PARAMS)], this.deleteTicket
        )

        this.router.get(
            `${this.path}/getAll`, authenticatedAdminMiddleware, this.getAllTicket
        )
    }



    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            const {message, priority, title} = req.body;
            
            const data = await this.TicketService.create(req.user._id, message, title, priority)

            res.status(201).json(data)
        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    }

 

    private getUserTicket = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            
            const data = await this.TicketService.getUserTicket(req.user._id)

            res.json(data)
        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    }

    private getTicket = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            
            const data = await this.TicketService.getTicket(req.params.id)

            res.json(data)
        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    }


    private getTicketByStatus = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            
            const data = await this.TicketService.getTicketByStatus(req.params.id, req.user._id)

            res.json(data)
        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    }

    private getTicketByPriority = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            
            const data = await this.TicketService.getTicketByPriority(req.params.id, req.user._id)

            res.json(data)
        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    }


    private getAllTicket = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            
            const data = await this.TicketService.getAllTicket()

            res.json(data)
            
        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    }

    private updateTicket = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {

            
            
            const data = await this.TicketService.update(req.body.id, req.body.status)

            res.json(data)
            
        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    }




    private  replyTicket = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {

           const {message, ticketId } = req.body
            

            const data = await this.TicketService.reply(ticketId, message , req.user._id, req.user.role)

            res.status(201).json(data)
            
        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    }




    private  deleteTicket = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {           
            const data = await this.TicketService.remove(req.params.id)

            res.json(data)
            
        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    }



}


export default TicketController;
