import { Document } from 'mongoose';

export default interface ShowTime extends Document {
    movieId: string;
    showDateId: string;
    time: string;
    isExpired: boolean
}