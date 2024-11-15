"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const joi_1 = __importDefault(require("joi"));
exports.register = joi_1.default.object({
    name: joi_1.default.string().required(),
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(5).required(),
    role: joi_1.default.string(),
    phone: joi_1.default.string()
});
exports.login = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
exports.default = { register: exports.register, login: exports.login };
