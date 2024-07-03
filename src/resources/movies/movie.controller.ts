import Controller from "@/utils/interfaces/controller.interface";
import { NextFunction, Request, Response, Router } from "express";
import MovieService from "./movie.service";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/movies/movie.validation";
import { RequestType } from "requestType";
import authenticatedMiddleware from "@/middleware/authenticated.middleware";
import authenticatedAdminMiddleware from "@/middleware/authenticatedAdmin.middleware";
import HttpException from "@/utils/exceptions/http.exception";
import { tryUpload } from "../../Cloudinary/uploads";




class MovieController implements Controller {
    public path = '/movie';
    public router = Router();
    private MovieService = new MovieService()


    constructor(){
        this.initialiseRoutes()
    }

    private initialiseRoutes():void {

        // movies
        this.router.post(
            `${this.path}/create`, 
            [authenticatedAdminMiddleware, tryUpload, validationMiddleware(validate.createMovie, RequestType.BODY),],
            this.create
        )

        // movies
        this.router.post(
            `${this.path}/create-with-image-url`, 
            [authenticatedAdminMiddleware, validationMiddleware(validate.createMovieWithImgUrl, RequestType.BODY),],
            this.createWithImageUrl
        )

        this.router.get(`${this.path}/`, authenticatedMiddleware,  this.getAllMovies)


        this.router.get(`${this.path}/paginated/`, [authenticatedMiddleware, validationMiddleware(validate.movieFilterQuery, RequestType.QUERY)],  this.getAllMoviesPaginated)


        this.router.get(`${this.path}/bookmark/`, [authenticatedMiddleware],  this.getAllMoviesBookmark)

        this.router.get(`${this.path}/by_booking`, [authenticatedAdminMiddleware],  this.getAllMoviesByBooking)

        this.router.get(`${this.path}/category/:cat`, [authenticatedMiddleware, validationMiddleware(validate.getMovieByCat, RequestType.PARAMS)],  this.getAllMoviesByCategory)

        this.router.post(`${this.path}/dates/`, [authenticatedMiddleware, validationMiddleware(validate.getMovieByDates, RequestType.BODY)],  this.getAllMoviesByDate)
        


        
        // show date================================================
        this.router.post(`${this.path}/create-cinema-dates/:id`,            [authenticatedAdminMiddleware, validationMiddleware(validate.createMovieDate, RequestType.BODY), validationMiddleware(validate.mutateMovieParams, RequestType.PARAMS)],  this.createCinemaDates)

        this.router.get(`${this.path}/get-shows-dates`, authenticatedMiddleware,  this.getShowDate)

        this.router.get(`${this.path}/get-shows-dates-by-movie/:id`, [authenticatedMiddleware, validationMiddleware(validate.mutateMovieParams, RequestType.PARAMS)],  this.getShowDatesByMovie)
        // show date================================================


        // show times====================================================
        this.router.post(
            `${this.path}/create-show-date-time`, 
            [authenticatedAdminMiddleware, validationMiddleware(validate.createShowDateTimeSchema, RequestType.BODY)],
            this.createShowDateTime
        )

        this.router.get(`${this.path}/get-shows-time-by-date/:id`, [authenticatedMiddleware, validationMiddleware(validate.mutateMovieParams, RequestType.PARAMS)],  this.getShowTimesByDate)
        // show times====================================================










    }






    // ************************ movies **********************
    // (parameter) req: Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>
    // (parameter) req: Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {          

            const data = await this.MovieService.create({...req.body, img: req?.file?.path})

            res.status(201).json(data)
        } catch (error:  HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error?.message);
        }
    }

    private createWithImageUrl = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {          

            const data = await this.MovieService.create({...req.body, img: req.body.imageUrl})

            res.status(201).json(data)
        } catch (error:  HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error?.message);
        }
    }




    private getAllMovies = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            
            const data = await this.MovieService.getAll()

            res.status(200).json(data)
        } catch (error: any) {
            return res.status(400).send(error.message);
            // next(new HttpException(400, error.message))
        }
    }



    private getAllMoviesPaginated = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {

            const {page, limit} = req.query
            
            const data = await this.MovieService.getAllPaginated(page, limit)

            res.json(data)
        } catch (error: any) {
            return res.status(400).send(error.message);
        }
    }




    private getAllMoviesByBooking = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            const data = await this.MovieService.getByBooking()
            res.json(data)
        } catch (error: any) {
            return res.status(400).send(error.message);
        }
    }



    private getAllMoviesBookmark = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            
            const data = await this.MovieService.getBookmarked()

            res.json(data)
        } catch (error: any) {
            return res.status(400).send(error.message);
        }
    }




    private getAllMoviesByCategory = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            
            const data = await this.MovieService.getByCategory(req.params.cat)

            res.json(data)
        } catch (error: any) {
            return res.status(400).send(error.message);
        }
    }



    private getAllMoviesByDate = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {

            const {start, end} = req.body
            
            const data = await this.MovieService.getByDate(start, end)

            res.json(data)
        } catch (error: any) {
            return res.status(400).send(error.message);
        }
    }


    // ************************** movies *****************************








    // ************************** date *****************************
    private createCinemaDates = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {           
            const data = await this.MovieService.createDates(req.params.id, req.body.date)

            res.status(200).json({data})
        } catch (error: any) {
            return res.status(400).send(error.message);
        }
    }


    private getShowDate = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            
            const data = await this.MovieService.getAllShowDate()

            res.json(data)
        } catch (error: any) {
            return res.status(400).send(error.message);
            // next(new HttpException(400, error.message))
        }
    }

    private getShowDatesByMovie = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            
            const movieId = req.params.id
            const data = await this.MovieService.getAllShowDateByMovie(movieId)

            res.json(data)
        } catch (error: any) {
            return res.status(400).send(error.message);
            // next(new HttpException(400, error.message))
        }
    }

    // ************************** date *****************************












     // ************************** time *****************************
    private createShowDateTime = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {           
            const {movieId, showDateId, time, dateString } = req.body

            const data = await this.MovieService.creaMovieTimeForShow(movieId, showDateId, time, dateString)

            res.status(201).json(data)
        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    }



    private getShowTimesByDate = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            
            const dateId = req.params.id
            const data = await this.MovieService.getAllShowTimeByDate(dateId)

            res.json(data)
        } catch (error: any) {
            return res.status(400).send(error.message);
            // next(new HttpException(400, error.message))
        }
    }

    // ************************** date *****************************

}


export default MovieController;