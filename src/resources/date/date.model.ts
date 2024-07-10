import mongoose, { Schema, model } from 'mongoose';
import ShowDate from '@/resources/date/date.interface';
import movieModel from '@/resources/movies/movie.model';
// import ShowTimeSchema from '@/resources/time/time.model';


const ShowDateSchema = new Schema(
    {
        movie: {
            type:mongoose.Schema.Types.ObjectId,
            ref: movieModel,
            required: true
        },
        date: {
            type: Date,
            default: Date.now(),
        },
        isExpired: {
            type: Boolean,
            default: false
        },
        
    },
    { timestamps: true }
);


ShowDateSchema.virtual('showTimes', {
    ref: 'ShowTime',
    localField: '_id',
    foreignField: 'showDateId',
  });

export default model<ShowDate>('ShowDate', ShowDateSchema);
