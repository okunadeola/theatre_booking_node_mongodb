"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.byUserBookingFilterQuery = exports.byMovieBookingFilterQuery = exports.bookingFilterQuery = exports.mutateBookingParams = exports.getReservedRecord = exports.createBookingMultiple = exports.createBooking = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createBooking = joi_1.default.object({
    movieId: joi_1.default.string().required(),
    showDateId: joi_1.default.string().required(),
    showTimeId: joi_1.default.string().required(),
    seat: joi_1.default.string().required(),
    paymentMethod: joi_1.default.string().required(),
    paymentReference: joi_1.default.string(),
});
exports.createBookingMultiple = joi_1.default.object({
    movieId: joi_1.default.string().required(),
    showDateId: joi_1.default.string().required(),
    showTimeId: joi_1.default.string().required(),
    seats: joi_1.default.array().required(),
    paymentMethod: joi_1.default.string().required(),
    paymentReference: joi_1.default.string(),
});
exports.getReservedRecord = joi_1.default.object({
    movieId: joi_1.default.string().required(),
    showDateId: joi_1.default.string().required(),
    showTimeId: joi_1.default.string().required(),
});
exports.mutateBookingParams = joi_1.default.object({
    id: joi_1.default.string().required(),
});
exports.bookingFilterQuery = joi_1.default.object({
    limit: joi_1.default.number().default(10),
    page: joi_1.default.number().default(1),
});
exports.byMovieBookingFilterQuery = joi_1.default.object({
    limit: joi_1.default.number().default(10),
    page: joi_1.default.number().default(1),
    movieId: joi_1.default.string().required(),
});
exports.byUserBookingFilterQuery = joi_1.default.object({
    limit: joi_1.default.number().default(10),
    page: joi_1.default.number().default(1),
    userId: joi_1.default.string().required(),
});
exports.default = { createBooking: exports.createBooking, createBookingMultiple: exports.createBookingMultiple, mutateBookingParams: exports.mutateBookingParams, getReservedRecord: exports.getReservedRecord, bookingFilterQuery: exports.bookingFilterQuery, byMovieBookingFilterQuery: exports.byMovieBookingFilterQuery, byUserBookingFilterQuery: exports.byUserBookingFilterQuery };
