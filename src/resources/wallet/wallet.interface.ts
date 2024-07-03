import { Document } from 'mongoose';

export default interface Wallet extends Document {
    userId: string;
    isInflow: boolean;
    username: string,
    amount: number
    currentBalance: number
    prevBalance: number
    note: string;
    role: string;
    paymentMethod: string;
    currency: string;
    status: string;
}
