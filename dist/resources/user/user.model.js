"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        max: 100
    },
    name: {
        type: String,
        max: 150,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String
    },
    account_balance: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: "USER"
    },
}, { timestamps: true, } // toJSON: { virtuals: true }// 
);
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const hash = await bcrypt_1.default.hash(this.password, 10);
    this.password = hash;
    next();
});
UserSchema.methods.isValidPassword = async function (password) {
    return await bcrypt_1.default.compare(password, this.password);
};
// instead of the aggregate cariied out in the user service folder which fetch user related booking. this virtual method together with the toJSON option at the top and the mongoose statement for [getAllBybook] method
// UserSchema.virtual('bookings', {
//     ref: 'Booking',
//     localField: '_id',
//     foreignField: 'userId',
//     justOne: false
//   });
exports.default = (0, mongoose_1.model)('User', UserSchema);
