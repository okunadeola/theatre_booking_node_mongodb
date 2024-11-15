"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replyTicket = exports.updateTicket = exports.mutateTicketParams = exports.createTicket = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createTicket = joi_1.default.object({
    message: joi_1.default.string().required(),
    priority: joi_1.default.string().optional(),
    title: joi_1.default.string().required()
});
exports.mutateTicketParams = joi_1.default.object({
    id: joi_1.default.string().required(),
});
exports.updateTicket = joi_1.default.object({
    id: joi_1.default.string().required(),
    status: joi_1.default.string().required(),
});
exports.replyTicket = joi_1.default.object({
    message: joi_1.default.string().required(),
    ticketId: joi_1.default.string().required(),
});
exports.default = { createTicket: exports.createTicket, mutateTicketParams: exports.mutateTicketParams, replyTicket: exports.replyTicket, updateTicket: exports.updateTicket };
