import mongoose, { Schema, model } from "mongoose"
import userModel from "../user/user.model"
import ticketModel from "./ticket.model";
import Reply from "./reply.interface";



const ReplySchema = new Schema({
    ticketId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: ticketModel,
        required: true,
    },
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: userModel,
        required: true,
    },
    message: {
        type: String,
       required: true
    },

}, {
    timestamps: true
})


export default model<Reply>('Reply', ReplySchema);
