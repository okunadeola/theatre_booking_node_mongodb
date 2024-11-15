"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShowDateTimeSchema = exports.createMovieDate = exports.getMovieFilter = exports.getMovieByDates = exports.getMovieByCat = exports.getAMovieByName = exports.movieFilterQuery = exports.mutateMovieParams = exports.createMovieWithImgUrl = exports.createMovie = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createMovie = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string(),
    trailer: joi_1.default.string(),
    genre: joi_1.default.string().required(),
    dateRelease: joi_1.default.string().required(),
    movie_length: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
});
exports.createMovieWithImgUrl = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string(),
    trailer: joi_1.default.string(),
    imageUrl: joi_1.default.string(),
    genre: joi_1.default.string().required(),
    dateRelease: joi_1.default.string().required(),
    movie_length: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
});
exports.mutateMovieParams = joi_1.default.object({
    id: joi_1.default.string().required(),
});
exports.movieFilterQuery = joi_1.default.object({
    limit: joi_1.default.number().default(10),
    page: joi_1.default.number().default(1),
});
exports.getAMovieByName = joi_1.default.object({
    cat: joi_1.default.string().required(),
});
exports.getMovieByCat = joi_1.default.object({
    cat: joi_1.default.string().required(),
});
exports.getMovieByDates = joi_1.default.object({
    start: joi_1.default.string().required(),
    end: joi_1.default.string().required(),
});
exports.getMovieFilter = joi_1.default.object({
    title: joi_1.default.string(),
    description: joi_1.default.string(),
    genre: joi_1.default.string().required(),
    dateRelease: joi_1.default.string().required(),
    length: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
});
exports.createMovieDate = joi_1.default.object({
    date: joi_1.default.date().required()
});
exports.createShowDateTimeSchema = joi_1.default.object({
    movieId: joi_1.default.string().required(),
    showDateId: joi_1.default.string().required(),
    time: joi_1.default.string().required(),
    dateString: joi_1.default.string().required(),
});
exports.default = { createMovie: exports.createMovie, createMovieWithImgUrl: exports.createMovieWithImgUrl, mutateMovieParams: exports.mutateMovieParams, getAMovieByName: exports.getAMovieByName, getMovieFilter: exports.getMovieFilter, createMovieDate: exports.createMovieDate, createShowDateTimeSchema: exports.createShowDateTimeSchema, movieFilterQuery: exports.movieFilterQuery, getMovieByCat: exports.getMovieByCat, getMovieByDates: exports.getMovieByDates };
