import { Document } from 'mongoose';

export default interface Ticket extends Document {
    userId: string;
    title: string;
    message: string,
    priority: string;
    status: string;
}