import { Document } from 'mongoose';

export default interface Movie extends Document {
    titile: string;
    description: string;
    img: string,
    trailer: string| null
    genre: string;
    dateRelease: string;
    movie_length: string;
    price: number;
    ratings: any,
    averageRating: any,
}
