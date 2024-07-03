import UserModel from '@/resources/user/user.model';
import User from '@/resources/user/user.interface';
import HttpException from '@/utils/exceptions/http.exception';
import token from '@/utils/token';



class UserService {
    private user = UserModel;

    /**
     * Register a new user
     */
    public async register(
        name: string,
        email: string,
        password: string,
        role: string,
        username: string,
        phone: string
    ): Promise<string | Error> {
        try {

            const result = await this.user.findOne({email});

            if(result){
                throw new  HttpException(403, 'User with that email already exists')
              }

            const user = await this.user.create({
                name,
                email,
                password,
                role,
                username,
                phone
            });

            const accessToken = token.createToken(user);

            return accessToken;
        } catch (error: HttpException | any) {
            throw  error  
        }
    }

    /**
     * Attempt to login a user
     */
    public async login(
        email: string,
        password: string
    ): Promise<Object | Error> {
        try {
            const user = await this.user.findOne({ email });

            if (!user) {
                throw new  HttpException(400, 'user not find')
            }

            if (await user.isValidPassword(password)) {
               const toke =  token.createToken(user);
                return  {user, token:toke}
            } else {
                throw new  HttpException(400, 'Wrong credentials given')
            }
        } catch (error: HttpException | any) {
            throw  error  
        }
    }



    public async getAllUsers(
    ): Promise<User[] | Error> {
        try {
            const user = await this.user.find();
            return user
        } catch (error: HttpException | any) {
            throw  error  
        }
    }

    public async getAllBybook(): Promise< Array<any>  | Error> {
        try {
            const result = await this.user.find().populate([
                {path: 'bookings', select: '_id'}
            ]).exec();
            return result;
        } catch (error: HttpException | any) {
            throw  error  
        }
    }


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

export default UserService;
