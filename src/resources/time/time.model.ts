import mongoose, { Schema, model } from 'mongoose';

import ShowDate from '@/resources/date/date.model';
import movieModel from '@/resources/movies/movie.model';
import ShowTime from '@/resources/time/time.interface';
import { boolean } from 'joi';


const ShowTimeSchema : Schema = new Schema(
    {
        movieId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: movieModel,
            required: true
        },
        showDateId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: ShowDate,
            required: true
        },
        time: {
            type: String,
        },
        isExpired: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);


export default model<ShowTime>('ShowTime', ShowTimeSchema);