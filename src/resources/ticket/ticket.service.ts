
import mongoose from "mongoose";
import UserModel from "../user/user.model";
import ReplyModel from "./reply.model";
import TicketModel from "./ticket.model";



class TicketService {

    private ticketModel = TicketModel
    private replyModel = ReplyModel


    public async create(
        userId: string,
        message: string,
        title: string,
        priority: string,
       ): Promise<Object | Error>{
            try {

                const ticket = await this.ticketModel.create({
                    userId, message, title, priority})
                    
                return ticket.toJSON()
            } catch (error: any) {
                return Error("unable to create ticket");
            }
    }

 

    public async getTicket(id: string): Promise<Object | Error>{
        try {
            // const ticket = await this.ticketModel.findById(id).populate([{path:'replies'}]).exec()


            const ticket = await this.ticketModel.aggregate([
                { 
                    $match: { _id: new mongoose.Types.ObjectId(id) }
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
            ])
              
            return {ticket}
        } catch (error) {
            return Error("unable to get ticket");
        }
    }

    public async getTicketByStatus(status: string, userId: string): Promise<Object | Error>{
        try {
        //     const ticket = await this.ticketModel.find({status, userId}).populate([{path:'replies'}]) 
        //    .exec()

        const ticket = await this.ticketModel.aggregate([
            { 
                $match: { userId: new mongoose.Types.ObjectId(userId), status:status  }
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
        ])


            return ticket
        } catch (error) {
            return Error("unable to get ticket");
        }
    }

    public async getTicketByPriority(priority: string, userId: string): Promise<Object | Error>{
        try {
            // const ticket = await this.ticketModel.find({priority, userId}).populate([{path:'replies'}]) 
            // .exec()

            const ticket = await this.ticketModel.aggregate([
                { 
                    $match: { userId: new mongoose.Types.ObjectId(userId), priority:priority  }
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
            ])


            return ticket
        } catch (error) {
            return Error("unable to get ticket");
        }
    }


    public async getUserTicket(id: string): Promise<Object | Error>{
        try {
            // const ticket = await this.ticketModel.find({userId:id}).populate([{path:'replies'}]) 
            // .exec()

            const ticket = await this.ticketModel.aggregate([
                { 
                    $match: { userId: new mongoose.Types.ObjectId(id) }
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
            ])

            return ticket
        } catch (error) {
            return Error("unable to get ticket");
        }
    }



    public async  getAllTicket():Promise<Array<any> | Error>{
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
            ])

            return tickets
        } catch (error) {
            return Error("unable to retrieve");
        }
    }



    public async  update(id: string,
        status: string,):Promise<Object | Error>{
        try {
            await this.ticketModel.findByIdAndUpdate(id, {$set : {status:status} })
            return "ticket status updated successfully"
        } catch (error) {
            return Error("unable to update ticket");
        }
    }


    public async  reply(ticketId: string,
        message: string, userId: string, role: string):Promise<Object | Error>{
        try {
            const reply = await this.replyModel.create({ticketId, message, userId})


            if(role === "ADMIN"){
                await this.update(ticketId, "answered")
            }
            return reply.toJSON()
        } catch (error) {
            return Error("unable to create reply");
        }
    }


    public async  remove(ticketId: string):Promise<Object | Error>{
        try {
            await this.ticketModel.findByIdAndDelete(ticketId)
            return "ticket deleted successfully"
        } catch (error) {
            return Error("unable to rettrieve");
        }
    }

}


export default TicketService