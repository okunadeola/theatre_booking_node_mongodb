import { Document } from 'mongoose';

export default interface Rating extends Document {
    movieId: string;
    userId: string;
    rating: number;
}
