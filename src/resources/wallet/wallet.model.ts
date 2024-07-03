import mongoose, { Schema, model } from 'mongoose';
import User from '@/resources/user/user.model';
import Wallet from './wallet.interface';



const WalletSchema = new Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    amount: {
        type: Number,
        default: 0
    },
    isInflow: {
        type: Boolean,
        required: true,
    },
    currentBalance: {
        type: Number,
        default: 0
    },
    prevBalance: {
        type: Number,
        default: 0
    },
    note: {
        type: String,
    },
    paymentMethod: {
        type: String,
        default: "flutterwave",
    },
    currency: {
        type: String,
        enum: ["NGN", "USD", "EUR", "GBP"],
        default: "NGN"
    },
    status: {
        type: String,
        enum: ["successful", "pending", "failed"],
        default: "pending"
    }
}, {
    timestamps: true
})



export default model<Wallet>('Wallet', WalletSchema);