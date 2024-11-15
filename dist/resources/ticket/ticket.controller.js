"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_middleware_1 = __importDefault(require("@/middleware/validation.middleware"));
const ticket_validation_1 = __importDefault(require("@/resources/ticket/ticket.validation"));
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
const authenticatedAdmin_middleware_1 = __importDefault(require("@/middleware/authenticatedAdmin.middleware"));
const authenticated_middleware_1 = __importDefault(require("@/middleware/authenticated.middleware"));
const ticket_service_1 = __importDefault(require("./ticket.service"));
class TicketController {
    constructor() {
        this.path = '/ticket';
        this.router = (0, express_1.Router)();
        this.TicketService = new ticket_service_1.default();
        this.create = async (req, res, next) => {
            try {
                const { message, priority, title } = req.body;
                const data = await this.TicketService.create(req.user._id, message, title, priority);
                res.status(201).json(data);
            }
            catch (error) {
                if (error instanceof http_exception_1.default) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send(error.message);
            }
        };
        this.getUserTicket = async (req, res, next) => {
            try {
                const data = await this.TicketService.getUserTicket(req.user._id);
                res.json(data);
            }
            catch (error) {
                if (error instanceof http_exception_1.default) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send(error.message);
            }
        };
        this.getTicket = async (req, res, next) => {
            try {
                const data = await this.TicketService.getTicket(req.params.id);
                res.json(data);
            }
            catch (error) {
                if (error instanceof http_exception_1.default) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send(error.message);
            }
        };
        this.getTicketByStatus = async (req, res, next) => {
            try {
                const data = await this.TicketService.getTicketByStatus(req.params.id, req.user._id);
                res.json(data);
            }
            catch (error) {
                if (error instanceof http_exception_1.default) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send(error.message);
            }
        };
        this.getTicketByPriority = async (req, res, next) => {
            try {
                const data = await this.TicketService.getTicketByPriority(req.params.id, req.user._id);
                res.json(data);
            }
            catch (error) {
                if (error instanceof http_exception_1.default) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send(error.message);
            }
        };
        this.getAllTicket = async (req, res, next) => {
            try {
                const data = await this.TicketService.getAllTicket();
                res.json(data);
            }
            catch (error) {
                if (error instanceof http_exception_1.default) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send(error.message);
            }
        };
        this.updateTicket = async (req, res, next) => {
            try {
                const data = await this.TicketService.update(req.body.id, req.body.status);
                res.json(data);
            }
            catch (error) {
                if (error instanceof http_exception_1.default) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send(error.message);
            }
        };
        this.replyTicket = async (req, res, next) => {
            try {
                const { message, ticketId } = req.body;
                const data = await this.TicketService.reply(ticketId, message, req.user._id, req.user.role);
                res.status(201).json(data);
            }
            catch (error) {
                if (error instanceof http_exception_1.default) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send(error.message);
            }
        };
        this.deleteTicket = async (req, res, next) => {
            try {
                const data = await this.TicketService.remove(req.params.id);
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
        this.router.post(`${this.path}/create`, [authenticated_middleware_1.default, (0, validation_middleware_1.default)(ticket_validation_1.default.createTicket, 0 /* RequestType.BODY */)], this.create);
        this.router.patch(`${this.path}/update`, [authenticated_middleware_1.default, (0, validation_middleware_1.default)(ticket_validation_1.default.updateTicket, 0 /* RequestType.BODY */)], this.updateTicket);
        this.router.get(`${this.path}/get/:id`, [authenticated_middleware_1.default, (0, validation_middleware_1.default)(ticket_validation_1.default.mutateTicketParams, 1 /* RequestType.PARAMS */)], this.getTicket);
        this.router.get(`${this.path}/get-by-status/:id`, [authenticated_middleware_1.default, (0, validation_middleware_1.default)(ticket_validation_1.default.mutateTicketParams, 1 /* RequestType.PARAMS */)], this.getTicketByStatus);
        this.router.get(`${this.path}/get-by-priority/:id`, [authenticated_middleware_1.default, (0, validation_middleware_1.default)(ticket_validation_1.default.mutateTicketParams, 1 /* RequestType.PARAMS */)], this.getTicketByPriority);
        this.router.get(`${this.path}/user/`, [authenticated_middleware_1.default], this.getUserTicket);
        this.router.post(`${this.path}/reply`, [authenticated_middleware_1.default, (0, validation_middleware_1.default)(ticket_validation_1.default.replyTicket, 0 /* RequestType.BODY */)], this.replyTicket);
        this.router.delete(`${this.path}/remove/:id`, [authenticated_middleware_1.default, (0, validation_middleware_1.default)(ticket_validation_1.default.mutateTicketParams, 1 /* RequestType.PARAMS */)], this.deleteTicket);
        this.router.get(`${this.path}/getAll`, authenticatedAdmin_middleware_1.default, this.getAllTicket);
    }
}
exports.default = TicketController;
