"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MovieSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true,
    },
    trailer: {
        type: String
    },
    genre: {
        type: String,
        required: true,
    },
    dateRelease: {
        type: String,
        required: true
    },
    movie_length: {
        type: String,
        required: true
    },
    price: {
        type: Number,
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Movie', MovieSchema);
