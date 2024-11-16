"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movie_service_1 = __importDefault(require("./movie.service"));
const validation_middleware_1 = __importDefault(require("@/middleware/validation.middleware"));
const movie_validation_1 = __importDefault(require("@/resources/movies/movie.validation"));
const authenticated_middleware_1 = __importDefault(require("@/middleware/authenticated.middleware"));
const authenticatedAdmin_middleware_1 = __importDefault(require("@/middleware/authenticatedAdmin.middleware"));
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
const uploads_1 = require("../../Cloudinary/uploads");
class MovieController {
    constructor() {
        this.path = '/movie';
        this.router = (0, express_1.Router)();
        this.MovieService = new movie_service_1.default();
        // ************************ movies **********************
        // (parameter) req: Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>
        // (parameter) req: Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>
        this.create = async (req, res, next) => {
            try {
                const data = await this.MovieService.create({ ...req.body, img: req?.file?.path });
                res.status(201).json(data);
            }
            catch (error) {
                if (error instanceof http_exception_1.default) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send(error?.message);
            }
        };
        this.createWithImageUrl = async (req, res, next) => {
            try {
                const data = await this.MovieService.create({ ...req.body, img: req.body.imageUrl });
                res.status(201).json(data);
            }
            catch (error) {
                if (error instanceof http_exception_1.default) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send(error?.message);
            }
        };
        this.getAllMovies = async (req, res, next) => {
            try {
                const data = await this.MovieService.getAll();
                res.status(200).json(data);
            }
            catch (error) {
                return res.status(400).send(error.message);
                // next(new HttpException(400, error.message))
            }
        };
        this.getAllMoviesPaginated = async (req, res, next) => {
            try {
                const { page, limit } = req.query;
                const data = await this.MovieService.getAllPaginated(page, limit);
                res.json(data);
            }
            catch (error) {
                return res.status(400).send(error.message);
            }
        };
        this.getAllMoviesByBooking = async (req, res, next) => {
            try {
                const data = await this.MovieService.getByBooking();
                res.json(data);
            }
            catch (error) {
                return res.status(400).send(error.message);
            }
        };
        this.getAllMoviesBookmark = async (req, res, next) => {
            try {
                const data = await this.MovieService.getBookmarked();
                res.json(data);
            }
            catch (error) {
                return res.status(400).send(error.message);
            }
        };
        this.getAllMoviesByCategory = async (req, res, next) => {
            try {
                const data = await this.MovieService.getByCategory(req.params.cat);
                res.json(data);
            }
            catch (error) {
                return res.status(400).send(error.message);
            }
        };
        this.getAllMoviesByDate = async (req, res, next) => {
            try {
                const { start, end } = req.body;
                const data = await this.MovieService.getByDate(start, end);
                res.json(data);
            }
            catch (error) {
                return res.status(400).send(error.message);
            }
        };
        // ************************** movies *****************************
        // ************************** date *****************************
        this.createCinemaDates = async (req, res, next) => {
            try {
                const data = await this.MovieService.createDates(req.params.id, req.body.date);
                res.status(200).json({ data });
            }
            catch (error) {
                const er = new Error("Unable to create a movie show date");
                return res.status(400).send(error.message || er.message);
            }
        };
        this.getShowDate = async (req, res, next) => {
            try {
                const data = await this.MovieService.getAllShowDate();
                res.json(data);
            }
            catch (error) {
                return res.status(400).send(error.message);
                // next(new HttpException(400, error.message))
            }
        };
        this.getShowDatesByMovie = async (req, res, next) => {
            try {
                const movieId = req.params.id;
                const data = await this.MovieService.getAllShowDateByMovie(movieId);
                res.json(data);
            }
            catch (error) {
                return res.status(400).send(error.message);
                // next(new HttpException(400, error.message))
            }
        };
        // ************************** date *****************************
        // ************************** time *****************************
        this.createShowDateTime = async (req, res, next) => {
            try {
                const { movieId, showDateId, time, dateString } = req.body;
                const data = await this.MovieService.creaMovieTimeForShow(movieId, showDateId, time, dateString);
                res.status(201).json(data);
            }
            catch (error) {
                if (error instanceof http_exception_1.default) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send(error.message);
            }
        };
        this.getShowTimesByDate = async (req, res, next) => {
            try {
                const dateId = req.params.id;
                const data = await this.MovieService.getAllShowTimeByDate(dateId);
                res.json(data);
            }
            catch (error) {
                return res.status(400).send(error.message);
                // next(new HttpException(400, error.message))
            }
        };
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        // movies
        this.router.post(`${this.path}/create`, [authenticatedAdmin_middleware_1.default, uploads_1.tryUpload, (0, validation_middleware_1.default)(movie_validation_1.default.createMovie, 0 /* RequestType.BODY */),], this.create);
        // movies
        this.router.post(`${this.path}/create-with-image-url`, [authenticatedAdmin_middleware_1.default, (0, validation_middleware_1.default)(movie_validation_1.default.createMovieWithImgUrl, 0 /* RequestType.BODY */),], this.createWithImageUrl);
        this.router.get(`${this.path}/`, authenticated_middleware_1.default, this.getAllMovies);
        this.router.get(`${this.path}/paginated/`, [(0, validation_middleware_1.default)(movie_validation_1.default.movieFilterQuery, 2 /* RequestType.QUERY */)], this.getAllMoviesPaginated);
        this.router.get(`${this.path}/bookmark/`, this.getAllMoviesBookmark);
        this.router.get(`${this.path}/by_booking`, [authenticatedAdmin_middleware_1.default], this.getAllMoviesByBooking);
        this.router.get(`${this.path}/category/:cat`, [authenticated_middleware_1.default, (0, validation_middleware_1.default)(movie_validation_1.default.getMovieByCat, 1 /* RequestType.PARAMS */)], this.getAllMoviesByCategory);
        this.router.post(`${this.path}/dates/`, [authenticated_middleware_1.default, (0, validation_middleware_1.default)(movie_validation_1.default.getMovieByDates, 0 /* RequestType.BODY */)], this.getAllMoviesByDate);
        // show date================================================
        this.router.post(`${this.path}/create-cinema-dates/:id`, [authenticatedAdmin_middleware_1.default, (0, validation_middleware_1.default)(movie_validation_1.default.createMovieDate, 0 /* RequestType.BODY */), (0, validation_middleware_1.default)(movie_validation_1.default.mutateMovieParams, 1 /* RequestType.PARAMS */)], this.createCinemaDates);
        this.router.get(`${this.path}/get-shows-dates`, authenticated_middleware_1.default, this.getShowDate);
        this.router.get(`${this.path}/get-shows-dates-by-movie/:id`, [authenticated_middleware_1.default, (0, validation_middleware_1.default)(movie_validation_1.default.mutateMovieParams, 1 /* RequestType.PARAMS */)], this.getShowDatesByMovie);
        // show date================================================
        // show times====================================================
        this.router.post(`${this.path}/create-show-date-time`, [authenticatedAdmin_middleware_1.default, (0, validation_middleware_1.default)(movie_validation_1.default.createShowDateTimeSchema, 0 /* RequestType.BODY */)], this.createShowDateTime);
        this.router.get(`${this.path}/get-shows-time-by-date/:id`, [authenticated_middleware_1.default, (0, validation_middleware_1.default)(movie_validation_1.default.mutateMovieParams, 1 /* RequestType.PARAMS */)], this.getShowTimesByDate);
        // show times====================================================
    }
}
exports.default = MovieController;
