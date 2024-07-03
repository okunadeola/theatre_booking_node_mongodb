import { Document } from 'mongoose';

export default interface Booking extends Document {
    movieId: string;
    showDateId: string;
    showTimeId: string;
    userId: string,
    seat:string,
    paymentMethod:string,
    isClaimed:boolean,
    paymentReference:string,
}
