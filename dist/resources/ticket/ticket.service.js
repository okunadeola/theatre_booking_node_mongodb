"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reply_model_1 = __importDefault(require("./reply.model"));
const ticket_model_1 = __importDefault(require("./ticket.model"));
class TicketService {
    constructor() {
        this.ticketModel = ticket_model_1.default;
        this.replyModel = reply_model_1.default;
    }
    async create(userId, message, title, priority) {
        try {
            const ticket = await this.ticketModel.create({
                userId, message, title, priority
            });
            return ticket.toJSON();
        }
        catch (error) {
            return Error("unable to create ticket");
        }
    }
    async getTicket(id) {
        try {
            // const ticket = await this.ticketModel.findById(id).populate([{path:'replies'}]).exec()
            const ticket = await this.ticketModel.aggregate([
                {
                    $match: { _id: new mongoose_1.default.Types.ObjectId(id) }
                },
                {
                    $lookup: {
                        from: 'replies',
                        localField: '_id',
                        foreignField: 'ticketId',
                        as: 'replies'
                    }
                },
                {
                    $project: {
                        userId: 1,
                        title: 1,
                        message: 1,
                        priority: 1,
                        status: 1,
                        replies: 1,
                        createdAt: 1,
                        updatedAt: 1
                    }
                }
            ]);
            return { ticket };
        }
        catch (error) {
            return Error("unable to get ticket");
        }
    }
    async getTicketByStatus(status, userId) {
        try {
            //     const ticket = await this.ticketModel.find({status, userId}).populate([{path:'replies'}]) 
            //    .exec()
            const ticket = await this.ticketModel.aggregate([
                {
                    $match: { userId: new mongoose_1.default.Types.ObjectId(userId), status: status }
                },
                {
                    $lookup: {
                        from: 'replies',
                        localField: '_id',
                        foreignField: 'ticketId',
                        as: 'replies'
                    }
                },
                {
                    $project: {
                        userId: 1,
                        title: 1,
                        message: 1,
                        priority: 1,
                        status: 1,
                        replies: 1,
                        createdAt: 1,
                        updatedAt: 1
                    }
                }
            ]);
            return ticket;
        }
        catch (error) {
            return Error("unable to get ticket");
        }
    }
    async getTicketByPriority(priority, userId) {
        try {
            // const ticket = await this.ticketModel.find({priority, userId}).populate([{path:'replies'}]) 
            // .exec()
            const ticket = await this.ticketModel.aggregate([
                {
                    $match: { userId: new mongoose_1.default.Types.ObjectId(userId), priority: priority }
                },
                {
                    $lookup: {
                        from: 'replies',
                        localField: '_id',
                        foreignField: 'ticketId',
                        as: 'replies'
                    }
                },
                {
                    $project: {
                        userId: 1,
                        title: 1,
                        message: 1,
                        priority: 1,
                        status: 1,
                        replies: 1,
                        createdAt: 1,
                        updatedAt: 1
                    }
                }
            ]);
            return ticket;
        }
        catch (error) {
            return Error("unable to get ticket");
        }
    }
    async getUserTicket(id) {
        try {
            // const ticket = await this.ticketModel.find({userId:id}).populate([{path:'replies'}]) 
            // .exec()
            const ticket = await this.ticketModel.aggregate([
                {
                    $match: { userId: new mongoose_1.default.Types.ObjectId(id) }
                },
                {
                    $lookup: {
                        from: 'replies',
                        localField: '_id',
                        foreignField: 'ticketId',
                        as: 'replies'
                    }
                },
                {
                    $project: {
                        userId: 1,
                        title: 1,
                        message: 1,
                        priority: 1,
                        status: 1,
                        replies: 1,
                        createdAt: 1,
                        updatedAt: 1
                    }
                }
            ]);
            return ticket;
        }
        catch (error) {
            return Error("unable to get ticket");
        }
    }
    async getAllTicket() {
        try {
            // const tickets = await this.ticketModel.find().sort({createdAt: -1}).populate([{path:'replies'}]).exec()
            const tickets = await this.ticketModel.aggregate([
                {
                    $lookup: {
                        from: 'replies',
                        localField: '_id',
                        foreignField: 'ticketId',
                        as: 'replies'
                    }
                },
                {
                    $project: {
                        userId: 1,
                        title: 1,
                        message: 1,
                        priority: 1,
                        status: 1,
                        replies: 1,
                        createdAt: 1,
                        updatedAt: 1
                    }
                }
            ]);
            return tickets;
        }
        catch (error) {
            return Error("unable to retrieve");
        }
    }
    async update(id, status) {
        try {
            await this.ticketModel.findByIdAndUpdate(id, { $set: { status: status } });
            return "ticket status updated successfully";
        }
        catch (error) {
            return Error("unable to update ticket");
        }
    }
    async reply(ticketId, message, userId, role) {
        try {
            const reply = await this.replyModel.create({ ticketId, message, userId });
            if (role === "ADMIN") {
                await this.update(ticketId, "answered");
            }
            return reply.toJSON();
        }
        catch (error) {
            return Error("unable to create reply");
        }
    }
    async remove(ticketId) {
        try {
            await this.ticketModel.findByIdAndDelete(ticketId);
            return "ticket deleted successfully";
        }
        catch (error) {
            return Error("unable to rettrieve");
        }
    }
}
exports.default = TicketService;
