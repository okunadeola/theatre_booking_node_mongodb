import { Document } from 'mongoose';

export default interface Reply extends Document {
    userId: string;
    ticketId: string;
    message: string,
}