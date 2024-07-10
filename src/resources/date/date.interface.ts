import { Document } from 'mongoose';

export default interface ShowDate extends Document {
    movieId: string;
    date: Date;
    isExpired: boolean
}
