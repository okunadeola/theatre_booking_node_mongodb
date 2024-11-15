"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_middleware_1 = __importDefault(require("@/middleware/validation.middleware"));
const wallet_validation_1 = __importDefault(require("@/resources/wallet/wallet.validation"));
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
const authenticatedAdmin_middleware_1 = __importDefault(require("@/middleware/authenticatedAdmin.middleware"));
const authenticated_middleware_1 = __importDefault(require("@/middleware/authenticated.middleware"));
const wallet_service_1 = __importDefault(require("./wallet.service"));
class WalletController {
    constructor() {
        this.path = '/wallets';
        this.router = (0, express_1.Router)();
        this.WalletService = new wallet_service_1.default();
        this.update = async (req, res, next) => {
            try {
                const { amount, isInflow, note, paymentMethod, currency, status } = req.body;
                const data = await this.WalletService.updateWallet(req?.user?._id, amount, isInflow, note, paymentMethod, currency, status);
                res.json(data);
            }
            catch (error) {
                if (error instanceof http_exception_1.default) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send(error.message);
            }
        };
        this.adminUpdate = async (req, res, next) => {
            try {
                const { amount, isInflow, note, paymentMethod, currency, status, userId } = req.body;
                const data = await this.WalletService.updateWallet(userId, amount, isInflow, note, paymentMethod, currency, status);
                res.json(data);
            }
            catch (error) {
                if (error instanceof http_exception_1.default) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send(error.message);
            }
        };
        this.getAWallet = async (req, res, next) => {
            try {
                const data = await this.WalletService.getWallet(req.user.id);
                res.json(data);
            }
            catch (error) {
                if (error instanceof http_exception_1.default) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send(error.message);
            }
        };
        this.getAllUserWalletRecord = async (req, res, next) => {
            try {
                const data = await this.WalletService.getAllWallet(req.params.id);
                res.json(data);
            }
            catch (error) {
                if (error instanceof http_exception_1.default) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send(error.message);
            }
        };
        this.getAllWalletRecord = async (req, res, next) => {
            try {
                const data = await this.WalletService.getAllWallet(req.user._id);
                res.json(data);
            }
            catch (error) {
                if (error instanceof http_exception_1.default) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send(error.message);
            }
        };
        this.getUserTotalBalance = async (req, res, next) => {
            try {
                const data = await this.WalletService.getUserWalletBalance(req.user._id);
                res.json(data);
            }
            catch (error) {
                if (error instanceof http_exception_1.default) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send(error.message);
            }
        };
        this.getWalletsTotalBalance = async (req, res, next) => {
            try {
                const data = await this.WalletService.getWalletBalance();
                res.json(data);
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
        this.router.post(`${this.path}/update`, [authenticated_middleware_1.default, (0, validation_middleware_1.default)(wallet_validation_1.default.updateWallet, 0 /* RequestType.BODY */)], this.update);
        this.router.post(`${this.path}/admin-update`, [authenticatedAdmin_middleware_1.default, (0, validation_middleware_1.default)(wallet_validation_1.default.adminUpdateWallet, 0 /* RequestType.BODY */)], this.adminUpdate);
        this.router.get(`${this.path}/get`, [authenticated_middleware_1.default], this.getAWallet);
        this.router.get(`${this.path}/getAll`, [authenticated_middleware_1.default], this.getAllWalletRecord);
        this.router.get(`${this.path}/getAll/user/:id`, [authenticated_middleware_1.default, (0, validation_middleware_1.default)(wallet_validation_1.default.mutateWalletParams, 1 /* RequestType.PARAMS */)], this.getAllUserWalletRecord);
        this.router.get(`${this.path}/user_balance`, authenticated_middleware_1.default, this.getUserTotalBalance);
        this.router.get(`${this.path}/balance`, authenticatedAdmin_middleware_1.default, this.getWalletsTotalBalance);
    }
}
exports.default = WalletController;
