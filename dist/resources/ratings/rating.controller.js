"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_middleware_1 = __importDefault(require("@/middleware/validation.middleware"));
const rating_validation_1 = __importDefault(require("@/resources/ratings/rating.validation"));
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
const authenticatedAdmin_middleware_1 = __importDefault(require("@/middleware/authenticatedAdmin.middleware"));
const authenticated_middleware_1 = __importDefault(require("@/middleware/authenticated.middleware"));
const rating_service_1 = __importDefault(require("./rating.service"));
class RatingController {
    constructor() {
        this.path = '/rating';
        this.router = (0, express_1.Router)();
        this.RatingService = new rating_service_1.default();
        this.add = async (req, res, next) => {
            try {
                const { rating, movieId } = req.body;
                const data = await this.RatingService.addRating(req.user._id, rating, movieId);
                res.status(201).json(data);
            }
            catch (error) {
                if (error instanceof http_exception_1.default) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send(error.message);
            }
        };
        this.getARating = async (req, res, next) => {
            try {
                const data = await this.RatingService.getRating(req.params.id);
                res.status(200).json(data);
            }
            catch (error) {
                if (error instanceof http_exception_1.default) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send(error.message);
            }
        };
        this.getAllRating = async (req, res, next) => {
            try {
                const data = await this.RatingService.getAllrating();
                res.status(200).json(data);
            }
            catch (error) {
                if (error instanceof http_exception_1.default) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send(error.message);
            }
        };
        this.getRatingByMovie = async (req, res, next) => {
            try {
                const data = await this.RatingService.getratingForMovie(req.user._id, req.params.id);
                res.status(200).json(data);
            }
            catch (error) {
                if (error instanceof http_exception_1.default) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send(error.message);
            }
        };
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.post(`${this.path}/create`, [authenticated_middleware_1.default, (0, validation_middleware_1.default)(rating_validation_1.default.addRating, 0 /* RequestType.BODY */)], this.add);
        this.router.get(`${this.path}/get/:id`, [authenticated_middleware_1.default, (0, validation_middleware_1.default)(rating_validation_1.default.mutateRatingParams, 1 /* RequestType.PARAMS */)], this.getARating);
        this.router.get(`${this.path}/getAll`, authenticatedAdmin_middleware_1.default, this.getAllRating);
        this.router.get(`${this.path}/get_by_user_and_movie/:id`, [authenticated_middleware_1.default, (0, validation_middleware_1.default)(rating_validation_1.default.mutateRatingParams, 1 /* RequestType.PARAMS */)], this.getRatingByMovie);
    }
}
exports.default = RatingController;
