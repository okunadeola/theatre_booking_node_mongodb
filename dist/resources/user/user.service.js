"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("@/resources/user/user.model"));
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
const token_1 = __importDefault(require("@/utils/token"));
class UserService {
    constructor() {
        this.user = user_model_1.default;
        // API to get all users with their bookings
        // app.get('/users', async (req, res) => {
        //     try {
        //     const users = await User.find().lean();
        //     const userIds = users.map(user => user._id);
        //     const bookings = await Booking.find({ user: { $in: userIds } }).lean();
        //     const userBookingsMap = bookings.reduce((acc, booking) => {
        //         if (!acc[booking.user]) {
        //         acc[booking.user] = [];
        //         }
        //         acc[booking.user].push(booking);
        //         return acc;
        //     }, {});
        //     const usersWithBookings = users.map(user => ({
        //         ...user,
        //         bookings: userBookingsMap[user._id] || [],
        //     }));
        //     res.status(200).json(usersWithBookings);
        //     } catch (error) {
        //     res.status(500).json({ error: error.message });
        //     }
        // });
    }
    /**
     * Register a new user
     */
    async register(name, email, password, role, username, phone) {
        try {
            const result = await this.user.findOne({ email });
            if (result) {
                throw new http_exception_1.default(403, 'User with that email already exists');
            }
            const user = await this.user.create({
                name,
                email,
                password,
                role,
                username,
                phone
            });
            const accessToken = token_1.default.createToken(user);
            return accessToken;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Attempt to login a user
     */
    async login(email, password) {
        try {
            const user = await this.user.findOne({ email });
            if (!user) {
                throw new http_exception_1.default(400, 'user not find');
            }
            if (await user.isValidPassword(password)) {
                const toke = token_1.default.createToken(user);
                return { user, token: toke };
            }
            else {
                throw new http_exception_1.default(400, 'Wrong credentials given');
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getAllUsers() {
        try {
            const user = await this.user.find();
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async getAllBybook() {
        try {
            // const result = await this.user.find().populate([
            //     {path: 'bookings', select: '_id'}
            // ]).exec();
            const result = await this.user.aggregate([
                {
                    $lookup: {
                        from: 'bookings', // The bookings collection name
                        localField: '_id',
                        foreignField: 'userId',
                        pipeline: [
                            {
                                $project: {
                                    _id: 1 // Only include the _id field
                                }
                            }
                        ],
                        as: 'bookings'
                    }
                }
            ]);
            return result;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = UserService;
