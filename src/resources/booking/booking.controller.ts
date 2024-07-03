import Controller from "@/utils/interfaces/controller.interface";
import { NextFunction, Request, Response, Router } from "express";

import validationMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/booking/booking.validation";
import { RequestType } from "requestType";

import authenticatedMiddleware from "@/middleware/authenticated.middleware";
import BookingService from "./booking.service";
import authenticatedAdminMiddleware from "@/middleware/authenticatedAdmin.middleware";
import HttpException from "@/utils/exceptions/http.exception";




class BookingController implements Controller {
    public path = '/booking';
    public router = Router();
    private bookingService = new BookingService()


    constructor(){
        this.initialiseRoutes()
    }

    private initialiseRoutes():void {

        // movies
        this.router.post(
            `${this.path}/create`, 
            [authenticatedMiddleware, validationMiddleware(validate.createBooking, RequestType.BODY)],
            this.create
        )

        this.router.patch(
            `${this.path}/update-booking-claim/:id`, 
            [authenticatedMiddleware, validationMiddleware(validate.mutateBookingParams, RequestType.PARAMS)],
            this.claimBooking
        )

        this.router.post(
            `${this.path}/create-multiple`, 
            [authenticatedMiddleware, validationMiddleware(validate.createBookingMultiple, RequestType.BODY)],
            this.createMultiple
        )

        this.router.post(
            `${this.path}/reserved-record`, 
            [authenticatedMiddleware, validationMiddleware(validate.getReservedRecord, RequestType.BODY)],
            this.getAllSeatReserved
        )

        this.router.get(`${this.path}/user/all/`, [authenticatedMiddleware],  this.getAllBookingForUser)

        this.router.post(`${this.path}/date-time/all/`, [authenticatedMiddleware], validationMiddleware(validate.getReservedRecord, RequestType.BODY ),  this.getAllUserBookingReceipt)

        this.router.get(`${this.path}/paginated`, authenticatedAdminMiddleware, validationMiddleware(validate.bookingFilterQuery, RequestType.QUERY),  this.getAllBooking)


        this.router.get(`${this.path}/by_movie/paginated`, authenticatedAdminMiddleware, validationMiddleware(validate.byMovieBookingFilterQuery, RequestType.QUERY),  this.getAllBookingByMovie)

        this.router.get(`${this.path}/by_user/paginated`, authenticatedAdminMiddleware, validationMiddleware(validate.byUserBookingFilterQuery, RequestType.QUERY),  this.getAllBookingByUser)


        this.router.get(`${this.path}/get-booking/:id`, authenticatedAdminMiddleware, validationMiddleware(validate.mutateBookingParams, RequestType.PARAMS),  this.getABooking)
        
    }


















    
    // ************************** booking **********************

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {           

            const {movieId, showDateId, showTimeId, seat, paymentMethod, paymentReference } = req.body

            const data = await this.bookingService.create(
                movieId, showDateId, showTimeId, req?.user?._id, seat, paymentMethod, paymentReference
            )

            res.status(201).json({data})
        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    }


    private claimBooking = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {           

            const data = await this.bookingService.updateBookingClaim(
                req?.params?.id, 
            )

            res.status(201).json(data)
        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    }



    private createMultiple = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {           

            const {movieId, showDateId, showTimeId, showSeatId, seats, paymentMethod, paymentReference } = req.body

            const data = await this.bookingService.createMultiple(
                movieId, showDateId, showTimeId, showSeatId, req?.user?._id, seats, paymentMethod, paymentReference
            )

            res.status(201).json(data)
        }  catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    }




    private getAllBooking = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {

            const {page, limit} = req.query 
            
            const data = await this.bookingService.getAll(page, limit)

            res.json(data)
        } catch (error: any) {
            return res.status(400).send(error.message);
        }
    }



    private getAllBookingByMovie = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {

            const {page, limit, movieId} = req.query 
            
            const data = await this.bookingService.getAllByMovie(page, limit, movieId)

            res.json(data)
        } catch (error: any) {
            return res.status(400).send(error.message);
        }
    }

    private getAllBookingByUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {

            const {page, limit, userId} = req.query 
            
            const data = await this.bookingService.getAllByUser(page, limit, userId)

            res.json(data)
        } catch (error: any) {
            return res.status(400).send(error.message);
        }
    }



    private getABooking = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            
            const data = await this.bookingService.getBookingById(req.params.id)
            res.json(data)
        } catch (error: any) {
            return res.status(400).send(error.message);
        }
    }



    private getAllBookingForUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            
            const data = await this.bookingService.getAllUserBooking(req.user._id)

            res.status(200).json(data)
        } catch (error: any) {
            return res.status(400).send(error.message);
        }
    }



    private getAllSeatReserved = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            const {movieId, showDateId, showTimeId } = req.body
            
            const data = await this.bookingService.getResevedSeatInfo(movieId, showDateId, showTimeId)

            res.status(200).json(data)
        } catch (error: any) {
            return res.status(400).send(error.message);
        }
    }




    private getAllUserBookingReceipt = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            const {movieId, showDateId, showTimeId } = req.body
            
            const data = await this.bookingService.getBookReceipt(movieId, showDateId, showTimeId, req.user._id)

            res.status(200).json(data)
        } catch (error: any) {
            return res.status(400).send(error.message);
        }
    }











    
    // private getAllUserBooking = async (
    //     req: Request,
    //     res: Response,
    //     next: NextFunction
    // ) : Promise<Response | void> => {
    //     try {
            
    //         const timeId = req.params.id
    //         const data = await this.bookingService.getAllShowSeatByTime(timeId)

    //         res.status(201).json({data})
    //     } catch (error: any) {
    //         return res.status(400).send(error.message);
    //     }
    // }



    // private getABooking = async (
    //     req: Request,
    //     res: Response,
    //     next: NextFunction
    // ) : Promise<Response | void> => {
    //     try {
            
    //         const timeId = req.params.id
    //         const data = await this.bookingService.getAllShowSeatByTime(timeId)

    //         res.status(201).json({data})
    //     } catch (error: any) {
    //         return res.status(400).send(error.message);
    //     }
    // }




    // private deleteABooking = async (
    //     req: Request,
    //     res: Response,
    //     next: NextFunction
    // ) : Promise<Response | void> => {
    //     try {
            
    //         const timeId = req.params.id
    //         const data = await this.bookingService.getAllShowSeatByTime(timeId)

    //         res.status(201).json({data})
    //     } catch (error: any) {
    //         return res.status(400).send(error.message);
    //     }
    // }

    // ************************** booking *****************************



}


export default BookingController;