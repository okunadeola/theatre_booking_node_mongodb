import Controller from "@/utils/interfaces/controller.interface";
import { NextFunction, Request, Response, Router } from "express";

import validationMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/ratings/rating.validation";
import { RequestType } from "requestType";
import HttpException from "@/utils/exceptions/http.exception";
import authenticatedAdminMiddleware from "@/middleware/authenticatedAdmin.middleware";
import authenticatedMiddleware from "@/middleware/authenticated.middleware";
import RatingService from "./rating.service";







class RatingController implements Controller {
    public path = '/rating';
    public router = Router();
    private RatingService = new RatingService();


    constructor(){
        this.initialiseRoutes();
    }

    private initialiseRoutes():void {
        this.router.post(
            `${this.path}/create`, 
            [authenticatedMiddleware, validationMiddleware(validate.addRating, RequestType.BODY)],
            this.add
        )

        this.router.get(
            `${this.path}/get/:id`, [authenticatedMiddleware,  validationMiddleware(validate.mutateRatingParams, RequestType.PARAMS)], this.getARating
        )

        this.router.get(
            `${this.path}/getAll`, authenticatedAdminMiddleware, this.getAllRating
        )

        this.router.get(
            `${this.path}/get_by_user_and_movie/:id`, [authenticatedMiddleware, validationMiddleware(validate.mutateRatingParams, RequestType.PARAMS)],   this.getRatingByMovie
        )
    }



    private add = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            const {rating, movieId} = req.body;
            
            const data = await this.RatingService.addRating(req.user._id, rating, movieId)

            res.status(201).json(data)
        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    }



    private getARating = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            
            const data = await this.RatingService.getRating(req.params.id)

            res.status(200).json(data)
        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    }


    private getAllRating = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            
            const data = await this.RatingService.getAllrating()

            res.status(200).json(data)
            
        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    }


    private getRatingByMovie = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            
            const data = await this.RatingService.getratingForMovie(req.user._id, req.params.id)

            res.status(200).json(data)
            
        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    }



}


export default RatingController;
