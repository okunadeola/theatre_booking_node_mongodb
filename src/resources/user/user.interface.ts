import { Document } from 'mongoose';

export default interface User extends Document {
    email: string;
    name: string;
    username: string,
    account_balance: number
    password: string;
    role: string;
    phone: string;
    bookings: Array<Object>;
    isValidPassword(password: string): Promise<Error | boolean>;
}
