"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_middleware_1 = __importDefault(require("@/middleware/validation.middleware"));
const user_validation_1 = __importDefault(require("@/resources/user/user.validation"));
const user_service_1 = __importDefault(require("@/resources/user/user.service"));
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
const authenticatedAdmin_middleware_1 = __importDefault(require("@/middleware/authenticatedAdmin.middleware"));
class UserController {
    constructor() {
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.UserService = new user_service_1.default();
        this.register = async (req, res, next) => {
            try {
                const { name, email, role, username, password, phone } = req.body;
                const token = await this.UserService.register(name, email, password, role, username, phone);
                res.status(201).json({ token });
            }
            catch (error) {
                if (error instanceof http_exception_1.default) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send(error.message);
            }
        };
        this.login = async (req, res, next) => {
            try {
                const { email, password } = req.body;
                const data = await this.UserService.login(email, password);
                res.status(200).json({ data });
            }
            catch (error) {
                if (error instanceof http_exception_1.default) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send(error.message);
            }
        };
        this.getUser = async (req, res, next) => {
            try {
                const data = await this.UserService.getAllUsers();
                res.status(201).json({ data });
            }
            catch (error) {
                if (error instanceof http_exception_1.default) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send(error.message);
            }
        };
        this.getAllUserByBooking = async (req, res, next) => {
            try {
                const data = await this.UserService.getAllBybook();
                res.status(201).json(data);
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
        this.router.post(`${this.path}/register`, (0, validation_middleware_1.default)(user_validation_1.default.register, 0 /* RequestType.BODY */), this.register);
        this.router.post(`${this.path}/login`, (0, validation_middleware_1.default)(user_validation_1.default.login, 0 /* RequestType.BODY */), this.login);
        this.router.get(`${this.path}`, authenticatedAdmin_middleware_1.default, this.getUser);
        this.router.get(`${this.path}/by_booking`, authenticatedAdmin_middleware_1.default, this.getAllUserByBooking);
    }
}
exports.default = UserController;
