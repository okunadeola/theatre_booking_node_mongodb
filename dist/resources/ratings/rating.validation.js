"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutateRatingParams = exports.addRating = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addRating = joi_1.default.object({
    rating: joi_1.default.number().min(0).max(5).required(),
    movieId: joi_1.default.string().required(),
});
exports.mutateRatingParams = joi_1.default.object({
    id: joi_1.default.string().required(),
});
exports.default = { addRating: exports.addRating, mutateRatingParams: exports.mutateRatingParams };
