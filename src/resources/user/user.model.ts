import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import User from '@/resources/user/user.interface';

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            max: 100
        },
        name: {
            type: String,
            max: 150,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String
        },
        account_balance: {
            type: Number,
            default: 0
        },
        role: {
            type: String,
            enum: ['ADMIN', 'USER'],
            default: "USER"
        },
    },
    { timestamps: true, } // toJSON: { virtuals: true }// 
);

UserSchema.pre<User>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;

    next();
});

UserSchema.methods.isValidPassword = async function (
    password: string
): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password);
};



// instead of the aggregate cariied out in the user service folder which fetch user related booking. this virtual method together with the toJSON option at the top and the mongoose statement for [getAllBybook] method
// UserSchema.virtual('bookings', {
//     ref: 'Booking',
//     localField: '_id',
//     foreignField: 'userId',
//     justOne: false
//   });

export default model<User>('User', UserSchema);


