"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_middleware_1 = __importDefault(require("@/middleware/validation.middleware"));
const booking_validation_1 = __importDefault(require("@/resources/booking/booking.validation"));
const authenticated_middleware_1 = __importDefault(require("@/middleware/authenticated.middleware"));
const booking_service_1 = __importDefault(require("./booking.service"));
const authenticatedAdmin_middleware_1 = __importDefault(require("@/middleware/authenticatedAdmin.middleware"));
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
class BookingController {
    constructor() {
        this.path = '/booking';
        this.router = (0, express_1.Router)();
        this.bookingService = new booking_service_1.default();
        // ************************** booking **********************
        this.create = async (req, res, next) => {
            try {
                const { movieId, showDateId, showTimeId, seat, paymentMethod, paymentReference } = req.body;
                const data = await this.bookingService.create(movieId, showDateId, showTimeId, req?.user?._id, seat, paymentMethod, paymentReference);
                res.status(201).json({ data });
            }
            catch (error) {
                if (error instanceof http_exception_1.default) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send(error.message);
            }
        };
        this.claimBooking = async (req, res, next) => {
            try {
                const data = await this.bookingService.updateBookingClaim(req?.params?.id);
                res.status(201).json(data);
            }
            catch (error) {
                if (error instanceof http_exception_1.default) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send(error.message);
            }
        };
        this.createMultiple = async (req, res, next) => {
            try {
                const { movieId, showDateId, showTimeId, showSeatId, seats, paymentMethod, paymentReference } = req.body;
                const data = await this.bookingService.createMultiple(movieId, showDateId, showTimeId, showSeatId, req?.user?._id, seats, paymentMethod, paymentReference);
                res.status(201).json(data);
            }
            catch (error) {
                if (error instanceof http_exception_1.default) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send(error.message);
            }
        };
        this.getAllBooking = async (req, res, next) => {
            try {
                const { page, limit } = req.query;
                const data = await this.bookingService.getAll(page, limit);
                res.json(data);
            }
            catch (error) {
                return res.status(400).send(error.message);
            }
        };
        this.getAllBookingByMovie = async (req, res, next) => {
            try {
                const { page, limit, movieId } = req.query;
                const data = await this.bookingService.getAllByMovie(page, limit, movieId);
                res.json(data);
            }
            catch (error) {
                return res.status(400).send(error.message);
            }
        };
        this.getAllBookingByUser = async (req, res, next) => {
            try {
                const { page, limit, userId } = req.query;
                const data = await this.bookingService.getAllByUser(page, limit, userId);
                res.json(data);
            }
            catch (error) {
                return res.status(400).send(error.message);
            }
        };
        this.getABooking = async (req, res, next) => {
            try {
                const data = await this.bookingService.getBookingById(req.params.id);
                res.json(data);
            }
            catch (error) {
                return res.status(400).send(error.message);
            }
        };
        this.getAllBookingForUser = async (req, res, next) => {
            try {
                const data = await this.bookingService.getAllUserBooking(req.user._id);
                res.status(200).json(data);
            }
            catch (error) {
                return res.status(400).send(error.message);
            }
        };
        this.getAllSeatReserved = async (req, res, next) => {
            try {
                const { movieId, showDateId, showTimeId } = req.body;
                const data = await this.bookingService.getResevedSeatInfo(movieId, showDateId, showTimeId);
                res.status(200).json(data);
            }
            catch (error) {
                return res.status(400).send(error.message);
            }
        };
        this.getAllUserBookingReceipt = async (req, res, next) => {
            try {
                const { movieId, showDateId, showTimeId } = req.body;
                const data = await this.bookingService.getBookReceipt(movieId, showDateId, showTimeId, req.user._id);
                res.status(200).json(data);
            }
            catch (error) {
                return res.status(400).send(error.message);
            }
        };
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        // movies
        this.router.post(`${this.path}/create`, [authenticated_middleware_1.default, (0, validation_middleware_1.default)(booking_validation_1.default.createBooking, 0 /* RequestType.BODY */)], this.create);
        this.router.patch(`${this.path}/update-booking-claim/:id`, [authenticated_middleware_1.default, (0, validation_middleware_1.default)(booking_validation_1.default.mutateBookingParams, 1 /* RequestType.PARAMS */)], this.claimBooking);
        this.router.post(`${this.path}/create-multiple`, [authenticated_middleware_1.default, (0, validation_middleware_1.default)(booking_validation_1.default.createBookingMultiple, 0 /* RequestType.BODY */)], this.createMultiple);
        this.router.post(`${this.path}/reserved-record`, [authenticated_middleware_1.default, (0, validation_middleware_1.default)(booking_validation_1.default.getReservedRecord, 0 /* RequestType.BODY */)], this.getAllSeatReserved);
        this.router.get(`${this.path}/user/all/`, [authenticated_middleware_1.default], this.getAllBookingForUser);
        this.router.post(`${this.path}/date-time/all/`, [authenticated_middleware_1.default], (0, validation_middleware_1.default)(booking_validation_1.default.getReservedRecord, 0 /* RequestType.BODY */), this.getAllUserBookingReceipt);
        this.router.get(`${this.path}/paginated`, authenticatedAdmin_middleware_1.default, (0, validation_middleware_1.default)(booking_validation_1.default.bookingFilterQuery, 2 /* RequestType.QUERY */), this.getAllBooking);
        this.router.get(`${this.path}/by_movie/paginated`, authenticatedAdmin_middleware_1.default, (0, validation_middleware_1.default)(booking_validation_1.default.byMovieBookingFilterQuery, 2 /* RequestType.QUERY */), this.getAllBookingByMovie);
        this.router.get(`${this.path}/by_user/paginated`, authenticatedAdmin_middleware_1.default, (0, validation_middleware_1.default)(booking_validation_1.default.byUserBookingFilterQuery, 2 /* RequestType.QUERY */), this.getAllBookingByUser);
        this.router.get(`${this.path}/get-booking/:id`, authenticatedAdmin_middleware_1.default, (0, validation_middleware_1.default)(booking_validation_1.default.mutateBookingParams, 1 /* RequestType.PARAMS */), this.getABooking);
    }
}
exports.default = BookingController;
