import mongoose, { Schema, model } from 'mongoose';
import ShowDate from '@/resources/date/date.interface';
import movieModel from '@/resources/movies/movie.model';
import userModel from '@/resources/user/user.model';
import Rating from '@/resources/ratings/ratings.interface';
// import ShowTimeSchema from '@/resources/time/time.model';


const RatingSchema = new Schema(
    {
        movieId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: movieModel,
            required: true
        },
        userId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: userModel,
            required: true
        },
        rating: {
            type: Number,
            required: true,
        },
       
    },
    { timestamps: true }
);


export default model<Rating>('Rating', RatingSchema);
