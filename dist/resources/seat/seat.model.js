"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SeatSchema = new mongoose_1.Schema({
    seatNumber: {
        type: String,
        required: true
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Seat', SeatSchema);
