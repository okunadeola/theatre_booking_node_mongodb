import Controller from "@/utils/interfaces/controller.interface";
import { NextFunction, Request, Response, Router } from "express";

import validationMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/wallet/wallet.validation";
import { RequestType } from "requestType";
import HttpException from "@/utils/exceptions/http.exception";
import authenticatedAdminMiddleware from "@/middleware/authenticatedAdmin.middleware";
import authenticatedMiddleware from "@/middleware/authenticated.middleware";
import WalletService from "./wallet.service";





class WalletController implements Controller {
    public path = '/wallets';
    public router = Router();
    private WalletService = new WalletService();


    constructor(){
        this.initialiseRoutes();
    }

    private initialiseRoutes():void {
        this.router.post(
            `${this.path}/update`, 
            [authenticatedMiddleware, validationMiddleware(validate.updateWallet, RequestType.BODY)],
            this.update
        )
        this.router.post(
            `${this.path}/admin-update`, 
            [authenticatedAdminMiddleware, validationMiddleware(validate.adminUpdateWallet, RequestType.BODY)],
            this.adminUpdate
        )

        this.router.get(
            `${this.path}/get`, [authenticatedMiddleware], this.getAWallet
        )

        this.router.get(
            `${this.path}/getAll`, [authenticatedMiddleware], this.getAllWalletRecord
        )

        this.router.get(
            `${this.path}/getAll/user/:id`, [authenticatedMiddleware, validationMiddleware(validate.mutateWalletParams, RequestType.PARAMS)], this.getAllUserWalletRecord
        )

        this.router.get(
            `${this.path}/user_balance`, authenticatedMiddleware, this.getUserTotalBalance
        )
        this.router.get(
            `${this.path}/balance`, authenticatedAdminMiddleware, this.getWalletsTotalBalance
        )
    }



    private update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            const {amount, isInflow, note, paymentMethod, currency, status} = req.body;
            
            const data = await this.WalletService.updateWallet(req?.user?._id, amount, isInflow, note, paymentMethod, currency, status)

            res.json(data)
        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    }


    private adminUpdate = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            const {amount, isInflow, note, paymentMethod, currency, status, userId} = req.body;
            
            const data = await this.WalletService.updateWallet(userId, amount, isInflow, note, paymentMethod, currency, status)

            res.json(data)
        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    }



    private getAWallet = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            
            const data = await this.WalletService.getWallet(req.user.id)

            res.json(data)
        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    }



    
    private getAllUserWalletRecord = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            
            const data = await this.WalletService.getAllWallet(req.params.id)

            res.json(data)

        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    }
    private getAllWalletRecord = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            
            const data = await this.WalletService.getAllWallet(req.user._id)

            res.json(data)

        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    }






    private getUserTotalBalance = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            
            const data = await this.WalletService.getUserWalletBalance(req.user._id)

            res.json(data)

        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    }



    private getWalletsTotalBalance = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            
            const data = await this.WalletService.getWalletBalance()

            res.json(data)

        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    }



}


export default WalletController;
