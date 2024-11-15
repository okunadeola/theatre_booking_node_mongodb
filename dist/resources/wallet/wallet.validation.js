"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletFilterQuery = exports.mutateWalletParams = exports.adminUpdateWallet = exports.updateWallet = void 0;
const joi_1 = __importDefault(require("joi"));
exports.updateWallet = joi_1.default.object({
    amount: joi_1.default.number().required(),
    isInflow: joi_1.default.bool().required(),
    note: joi_1.default.string(),
    paymentMethod: joi_1.default.string(),
    currency: joi_1.default.string().required(),
    status: joi_1.default.string().required(),
});
exports.adminUpdateWallet = joi_1.default.object({
    userId: joi_1.default.string().required(),
    amount: joi_1.default.number().required(),
    isInflow: joi_1.default.bool().required(),
    note: joi_1.default.string(),
    paymentMethod: joi_1.default.string(),
    currency: joi_1.default.string().required(),
    status: joi_1.default.string().required(),
});
exports.mutateWalletParams = joi_1.default.object({
    id: joi_1.default.string().required(),
});
exports.walletFilterQuery = joi_1.default.object({
    limit: joi_1.default.number().default(10),
    page: joi_1.default.number().default(1),
});
exports.default = { updateWallet: exports.updateWallet, mutateWalletParams: exports.mutateWalletParams, walletFilterQuery: exports.walletFilterQuery, adminUpdateWallet: exports.adminUpdateWallet };
