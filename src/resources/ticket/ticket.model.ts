import mongoose, { Schema, model } from "mongoose"
import userModel from "../user/user.model"
import Ticket from "./ticket.interface";
import replyModel from "./reply.model";



const TicketSchema = new Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: userModel,
        required: true,
    },

    title: {
        type: String,
    },
    message: {
        type: String,
       required: true
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high",],
        default: "low"
    },
    status: {
        type: String,
        enum: ["pending", "answered", "closed", "deleted"],
        default: "pending"
    }
}, {
    timestamps: true
})


TicketSchema.virtual('replies', {
    ref: 'Reply',
    localField: '_id',
    foreignField: 'ticketId',
  });

export default model<Ticket>('Ticket', TicketSchema);