import { Schema, model } from 'mongoose';
import Movie from '@/resources/movies/movie.interface';

const MovieSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true,
        },
        trailer: {
            type: String
        },
        genre: {
            type: String,
            required: true,
        },
        dateRelease: {
            type: String,
            required: true
        },
        movie_length: {
            type: String,
            required: true
        },
        price: {
            type: Number,
        }
    },
    { timestamps: true }
);


// MovieSchema.virtual('bookings', {
//     ref: 'Booking',
//     localField: '_id',
//     foreignField: 'movieId',
//   });


export default model<Movie>('Movie', MovieSchema);
