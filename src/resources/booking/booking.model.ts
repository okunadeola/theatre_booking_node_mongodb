import mongoose, { Schema, model } from 'mongoose';
// import movieModel from '@/resources/movies/movie.model';
import ShowDate from '@/resources/date/date.model'
import ShowTime from '@/resources/time/time.model'
import userModel from '@/resources/user/user.model';
import Booking from '@/resources/booking/booking.interface';



const BookingSchema = new Schema(
    {
        movieId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Movie',
            required: true
        },
        showDateId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: ShowDate,
            required: true
        },
        showTimeId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: ShowTime,
            required: true
        },
        userId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: userModel,
            required: true
        },
        seat: {
            type:String,
            required: true
        },
        paymentMethod: {
            type:String,
            default: "flutterwave",
        },
        isClaimed: {
            type: Boolean,
        },
        paymentReference: {
            type: String,
        },

    },
    { timestamps: true }
);

export default model<Booking>('Booking', BookingSchema);