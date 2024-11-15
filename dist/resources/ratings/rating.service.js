"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
const ratings_model_1 = __importDefault(require("@/resources/ratings/ratings.model"));
class RatingService {
    constructor() {
        this.ratingModel = ratings_model_1.default;
    }
    async addRating(userId, rating, movieId) {
        try {
            const findrating = await this.ratingModel.findOne({ userId, movieId });
            if (findrating) {
                throw new http_exception_1.default(403, "You already rate this movie");
            }
            const rate = await this.ratingModel.create({
                userId, rating, movieId
            });
            return rate.toJSON();
        }
        catch (error) {
            throw error;
        }
    }
    async getRating(id) {
        try {
            const rates = await this.ratingModel.find({ movieId: id });
            return rates;
        }
        catch (error) {
            return Error("unable to get rating");
        }
    }
    async getAllrating() {
        try {
            const rates = await this.ratingModel.find().sort({ createdAt: -1 });
            return rates;
        }
        catch (error) {
            return Error("unable to retrieve rating");
        }
    }
    async getratingForMovie(userId, movieId) {
        try {
            const rates = await this.ratingModel.find({ movieId, userId });
            return rates;
        }
        catch (error) {
            return Error("unable to retrieve rating");
        }
    }
}
exports.default = RatingService;
