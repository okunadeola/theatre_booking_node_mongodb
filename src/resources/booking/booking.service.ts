import HttpException from "@/utils/exceptions/http.exception";
import MoviesModel from "@/resources/movies/movie.model";
import BookingModel from "@/resources/booking/booking.model";
import UserModel from "@/resources/user/user.model";
import WalletModel from "@/resources/wallet/wallet.model";
import Booking from "@/resources/booking/booking.interface";
import mongoose from "mongoose";


class BookingService {
    private bookingModel = BookingModel
    private userModel = UserModel
    private walletModel = WalletModel
    private movie = MoviesModel



    public async create(movieId : string,
        showDateId : string ,
        showTimeId : string,
        userId : string,
        seat : string,
        paymentMethod: string,
        paymentReference: string | null,
    ): Promise<Booking | Error> {

        try {
      

            const data = {
                movieId, showDateId, showTimeId, userId, seat, paymentMethod, paymentReference
            }

            const findSeat =  await this.bookingModel.findOne({movieId, showDateId, showTimeId, seat})

            const mv = await this.movie.findById(movieId)  

            const snapshot = await this.userModel.findById(userId) 

            const userBalance = snapshot?.toJSON().account_balance



            if(!snapshot) throw new HttpException(403, "User not found")


            // if seat booked already and payment was made by user. refunding user...
            if(findSeat){
                if(paymentMethod !== "wallet" && mv){

                    const currentBalance = this.deriveBalnce(userBalance!, Number(mv?.price), true)


                    await this.walletModel.create({
                        userId, 
                        paymentMethod,
                        currentBalance,
                        amount: mv?.price,   
                        prevBalance:userBalance,
                        isInflow: true,
                        note: 'Failed booking reversal',
                        currency : 'NGN',
                        status: 'successful', 
                    })


                    await snapshot?.updateOne({ $set: {account_balance:currentBalance }}, { new: true })

                    throw new HttpException(403, "Seat already booked, kindly pick available seat. your fund has been reverted and added to your wallet balance")

                }else{
                    throw new HttpException(403, "Seat already booked, kindly pick available seat")
                }
            }

            if(paymentMethod === "wallet"){
                // console.log('here', userBalance)

                if(userBalance! < Number(mv?.price) ){
                    throw new HttpException(403, "Your current account balance is low to book seat")
                }
                const currentBalance = this.deriveBalnce(Number(userBalance), Number(mv?.price), false)

                await this.walletModel.create({
                    userId, 
                    paymentMethod,
                    currentBalance,
                    prevBalance:userBalance,
                    amount: mv?.price,
                    isInflow: false,
                    note: 'booking',
                    currency : 'NGN',
                    status: 'successful', 
                })

                 await snapshot?.updateOne({ $set: {account_balance:currentBalance }}, { new: true })
            }

            const booking = await this.bookingModel.create({
                ...data
            })

            return booking.toJSON();
        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                throw error;
            }
            throw new Error("Unable to create a booking record")
            
        }
    }


    public async createMultiple(movieId : string,
        showDateId : string ,
        showTimeId : string,
        showSeatId : string,
        userId : string,
        seats : Array<string>,
        paymentMethod: string,
        paymentReference: string,
    ): Promise<Object | Error> {
        try {

            const mv = await this.movie.findById(movieId)  

            const snapshot = await this.userModel.findById(userId) 

            const userBalance = Number(snapshot?.toJSON()?.account_balance)
            const expectedAmount = Number(mv?.price) * seats.length


            if(!snapshot) throw new HttpException(403, "User not found")

            if(paymentMethod === "wallet"){
                if(userBalance < expectedAmount ){
                    throw new HttpException(403, "Your current account  balance is low to book seat")
                }
            }

            let bookedSeat : Array<any> = []
            let unavailableSeat : Array<any> = []

            for (let i = 0; i < seats.length; i++) {
                const seat = seats[i]
                const findSeat = await this.bookingModel.findOne({where : {movieId, showDateId, showTimeId, seat}})

                if(findSeat){

                  unavailableSeat.push(seat)
                
                }else{

                    let data2 = {
                        movieId, showSeatId, showDateId, showTimeId, userId, seat, paymentMethod, paymentReference
                    }

                   const booking = await this.bookingModel.create({
                        ...data2
                    })

                    const book =  booking.toJSON()
                    bookedSeat.push(book)
    
                }
                
            }

            const actualAmount = mv!.price * bookedSeat.length

            if(paymentMethod === "wallet"){
                
                const currentBalance = this.deriveBalnce(userBalance, actualAmount, false)

                await this.walletModel.create({
                    userId, 
                    paymentMethod,
                    currentBalance,
                    amount: actualAmount,   
                    prevBalance:userBalance,
                    isInflow: false,
                    note: 'booking',
                    currency : 'NGN',
                    status: 'successful', 
                })

                
                await snapshot?.updateOne({ $set: {account_balance:currentBalance }}, { new: true })
            }else if(paymentMethod !== "wallet" && unavailableSeat.length ){

                const amt = mv!.price * unavailableSeat.length
                const currentBalance = this.deriveBalnce(userBalance, amt, true)

                await this.walletModel.create({
                    userId, 
                    paymentMethod,
                    currentBalance,
                    amount: mv!.price * unavailableSeat.length,   
                    prevBalance:userBalance,
                    isInflow: true,
                    note: 'Failed booking reversal',
                    currency : 'NGN',
                    status: 'successful', 
                })

             
                await snapshot?.updateOne({ $set: {account_balance:currentBalance }})

                if(bookedSeat?.length === 0 ){
                    throw new HttpException(403, "Seats already booked, kindly pick available seat. your fund has been reverted and added to your wallet balance")
                }
            }

            return {bookedSeat, unavailableSeat};

        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                throw error;
            }
            throw new Error("Unable to create a booking record")
            
        }
    }





    public async updateBookingClaim(
        bookingId : string): Promise<string | Error> {
        try {

            const Booking = await this.bookingModel.findById(bookingId)
            const bookingData = Booking?.toJSON()

            if(!bookingData){
                throw new HttpException(403, "Booking record is not available") 
            }

            if(bookingData.isClaimed === true){
                throw new HttpException(403, "The booking has already being claimed!") 
            }

            await  Booking?.updateOne({ $set : { isClaimed : true} })
            return 'booking claimed!';

        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                throw error;
            }
            throw new Error("Unable to update a booking record")
            
        }
    }



    public async getResevedSeatInfo(
        movieId : string,
        showDateId : string ,
        showTimeId : string): Promise<Array<any> | Error> {
        try {

            const reservedSeat =  await this.bookingModel.find({movieId, showDateId, showTimeId})
            return reservedSeat;
        } catch (error) {
            throw new Error("Unable to get a booking record")
        }
    }


    public async getAllByMovie(pageQ: string | any, limitQ:string | any, movieId:string | any): Promise<Object | Error> {
        try {

            const page = parseInt((pageQ || 1).toString())
            const limit = parseInt((limitQ || 10).toString())
            const skip = (page -1) * limit;

            const totalCount = await this.bookingModel.countDocuments({movieId})

            // const all = await this.bookingModel.find({movieId}).limit(limit).skip(skip).populate([{ path: 'movieId' }, { path: 'showDateId' }, { path: 'showTimeId' } ]).exec()
            const all = await this.bookingModel.aggregate([ 

                {
                    $match: {
                        movieId: new mongoose.Types.ObjectId(movieId)
                    }
                  },


                // Lookup (similar to populate) for movieId
                {
                  $lookup: {
                    from: "movies", // Your movies collection name
                    localField: "movieId",
                    foreignField: "_id",
                    as: "movie"
                  }
                },
                
                // Lookup for showDateId
                {
                  $lookup: {
                    from: "showdates", // Your show dates collection name
                    localField: "showDateId",
                    foreignField: "_id",
                    as: "showDate"
                  }
                },
                
                // Lookup for showTimeId
                {
                  $lookup: {
                    from: "showtimes", // Your show times collection name
                    localField: "showTimeId",
                    foreignField: "_id",
                    as: "showTime"
                  }
                },
                
                // Unwind the arrays created by lookups to get single objects
                {
                  $unwind: {
                    path: "$movie",
                    preserveNullAndEmptyArrays: true
                  }
                },
                {
                  $unwind: {
                    path: "$showDate",
                    preserveNullAndEmptyArrays: true
                  }
                },
                {
                  $unwind: {
                    path: "$showTime",
                    preserveNullAndEmptyArrays: true
                  }
                },
                
                // Project to reshape the output if needed
                {
                  $project: {
                    _id: 1,
                    userId: 1,
                    movie: "$movie",
                    showDate: "$showDate",
                    showTime: "$showTime",
                    createdAt: 1,
                    seat: 1,
                    paymentMethod: 1,
                    paymentReference: 1,
                    isClaimed: 1
                    // Add any other fields you need
                  }
                },

                { $skip: skip },
                { $limit: limit }
              ]);
                

            const nextPage = (page * limit) <= totalCount  ? page + 1 : null;

            return  {data: all, totalCount, nextPage};
        } catch (error) {
            throw new Error("Unable to get booking")
        }
    }



    public async getAllByUser(pageQ: string | any, limitQ:string | any, userId:string | any): Promise<Object | Error> {
        try {

            const page = parseInt((pageQ || 1).toString())
            const limit = parseInt((limitQ || 10).toString())
            const skip = (page -1) * limit;

            const totalCount = await this.bookingModel.countDocuments({userId})

           // const all = await this.bookingModel.find({userId}).limit(limit).skip(skip).populate([{ path: 'movieId' }, { path: 'showDateId' }, { path: 'showTimeId' } ]).exec()

            const all = await this.bookingModel.aggregate([ 

                {
                    $match: {
                        userId: new mongoose.Types.ObjectId(userId)
                    }
                  },


                // Lookup (similar to populate) for movieId
                {
                  $lookup: {
                    from: "movies", // Your movies collection name
                    localField: "movieId",
                    foreignField: "_id",
                    as: "movie"
                  }
                },
                
                // Lookup for showDateId
                {
                  $lookup: {
                    from: "showdates", // Your show dates collection name
                    localField: "showDateId",
                    foreignField: "_id",
                    as: "showDate"
                  }
                },
                
                // Lookup for showTimeId
                {
                  $lookup: {
                    from: "showtimes", // Your show times collection name
                    localField: "showTimeId",
                    foreignField: "_id",
                    as: "showTime"
                  }
                },
                
                // Unwind the arrays created by lookups to get single objects
                {
                  $unwind: {
                    path: "$movie",
                    preserveNullAndEmptyArrays: true
                  }
                },
                {
                  $unwind: {
                    path: "$showDate",
                    preserveNullAndEmptyArrays: true
                  }
                },
                {
                  $unwind: {
                    path: "$showTime",
                    preserveNullAndEmptyArrays: true
                  }
                },
                
                // Project to reshape the output if needed
                {
                  $project: {
                    _id: 1,
                    userId: 1,
                    movie: "$movie",
                    showDate: "$showDate",
                    showTime: "$showTime",
                    createdAt: 1,
                    seat: 1,
                    paymentMethod: 1,
                    paymentReference: 1,
                    isClaimed: 1
                    // Add any other fields you need
                  }
                },

                { $skip: skip },
                { $limit: limit }
              ]);

                const nextPage = (page * limit) <= totalCount  ? page + 1 : null;

            return  {data: all, totalCount, nextPage};
        } catch (error) {
            throw new Error("Unable to get booking")
        }
    }



    public async getAll(pageQ: string | any, limitQ:string | any): Promise<Object | Error> {
        try {

            const page = parseInt((pageQ || 1).toString())
            const limit = parseInt((limitQ || 10).toString())
            const skip = (page -1) * limit;

            const totalCount = await this.bookingModel.countDocuments()

            // const all =await this.bookingModel.find().limit(limit).skip(skip).populate([{ path: 'movieId' }, { path: 'showDateId' }, { path: 'showTimeId' } ]).exec()
            const all = await this.bookingModel.aggregate([ 
                // Lookup (similar to populate) for movieId
                {
                  $lookup: {
                    from: "movies", // Your movies collection name
                    localField: "movieId",
                    foreignField: "_id",
                    as: "movie"
                  }
                },
                
                // Lookup for showDateId
                {
                  $lookup: {
                    from: "showdates", // Your show dates collection name
                    localField: "showDateId",
                    foreignField: "_id",
                    as: "showDate"
                  }
                },
                
                // Lookup for showTimeId
                {
                  $lookup: {
                    from: "showtimes", // Your show times collection name
                    localField: "showTimeId",
                    foreignField: "_id",
                    as: "showTime"
                  }
                },
                
                // Unwind the arrays created by lookups to get single objects
                {
                  $unwind: {
                    path: "$movie",
                    preserveNullAndEmptyArrays: true
                  }
                },
                {
                  $unwind: {
                    path: "$showDate",
                    preserveNullAndEmptyArrays: true
                  }
                },
                {
                  $unwind: {
                    path: "$showTime",
                    preserveNullAndEmptyArrays: true
                  }
                },
                
                // Project to reshape the output if needed
                {
                  $project: {
                    _id: 1,
                    userId: 1,
                    movie: "$movie",
                    showDate: "$showDate",
                    showTime: "$showTime",
                    createdAt: 1,
                    seat: 1,
                    paymentMethod: 1,
                    paymentReference: 1,
                    isClaimed: 1 //its included only if its true
                  }
                },
                { $skip: skip },
                { $limit: limit }
              ]);

              // console.log(totalCount, all.length)

                const nextPage = (page * limit) <= totalCount  ? page + 1 : null;

            return  {data: all, totalCount, nextPage};


            // {
            //   $project: {
            //     paymentReference: 1,
            //     isClaimed: {
            //       $ifNull: ["$isClaimed", false]  // If isClaimed is null/missing, default to false
            //     }
            //   }
            // }
            
            // // Alternative approach using $cond
            // {
            //   $project: {
            //     paymentReference: 1,
            //     isClaimed: {
            //       $cond: {
            //         if: { $eq: ["$isClaimed", true] },
            //         then: true,
            //         else: false
            //       }
            //     }
            //   }
            // }
        } catch (error) {
            throw new Error("Unable to get booking")
        }
    }




    public async getBookingById(id: string): Promise<Array<any> | Error> {
        try {

            // const all = await this.bookingModel.find({id}).populate([{ path: 'movieId' }, { path: 'showDateId' }, { path: 'showTimeId' } ]).exec()

            const all = await this.bookingModel.aggregate([
                // Match documents for the specific user
                {
                  $match: {
                    id: new mongoose.Types.ObjectId(id)
                  }
                },
                
                // Lookup (similar to populate) for movieId
                {
                  $lookup: {
                    from: "movies", // Your movies collection name
                    localField: "movieId",
                    foreignField: "_id",
                    as: "movie"
                  }
                },
                
                // Lookup for showDateId
                {
                  $lookup: {
                    from: "showdates", // Your show dates collection name
                    localField: "showDateId",
                    foreignField: "_id",
                    as: "showDate"
                  }
                },
                
                // Lookup for showTimeId
                {
                  $lookup: {
                    from: "showtimes", // Your show times collection name
                    localField: "showTimeId",
                    foreignField: "_id",
                    as: "showTime"
                  }
                },
                
                // Unwind the arrays created by lookups to get single objects
                {
                  $unwind: {
                    path: "$movie",
                    preserveNullAndEmptyArrays: true
                  }
                },
                {
                  $unwind: {
                    path: "$showDate",
                    preserveNullAndEmptyArrays: true
                  }
                },
                {
                  $unwind: {
                    path: "$showTime",
                    preserveNullAndEmptyArrays: true
                  }
                },
                // Project to reshape the output if needed
                {
                  $project: {
                    _id: 1,
                    userId: 1,
                    movie: "$movie",
                    showDate: "$showDate",
                    showTime: "$showTime",
                    createdAt: 1,
                    seat: 1,
                    paymentMethod: 1,
                    paymentReference: 1,
                    isClaimed: 1
                    // Add any other fields you need
                  }
                }
              ]);

            return all;
        } catch (error) {
            throw new Error("Unable to get booking")
        }
    }



    public async getAllUserBooking(userId: string): Promise<Array<any> | Error> {
        try {

            // const all = await this.bookingModel.find({userId}).sort({ createdAt: -1 }).populate([{ path: 'movieId' }, { path: 'showDateId' }, { path: 'showTimeId' } ]).exec()

            // return all;

            const all = await this.bookingModel.aggregate([
                // Match documents for the specific user
                {
                  $match: {
                    userId: new mongoose.Types.ObjectId(userId)
                  }
                },
                
                // Lookup (similar to populate) for movieId
                {
                  $lookup: {
                    from: "movies", // Your movies collection name
                    localField: "movieId",
                    foreignField: "_id",
                    as: "movie"
                  }
                },
                
                // Lookup for showDateId
                {
                  $lookup: {
                    from: "showdates", // Your show dates collection name
                    localField: "showDateId",
                    foreignField: "_id",
                    as: "showDate"
                  }
                },
                
                // Lookup for showTimeId
                {
                  $lookup: {
                    from: "showtimes", // Your show times collection name
                    localField: "showTimeId",
                    foreignField: "_id",
                    as: "showTime"
                  }
                },
                
                // Unwind the arrays created by lookups to get single objects
                {
                  $unwind: {
                    path: "$movie",
                    preserveNullAndEmptyArrays: true
                  }
                },
                {
                  $unwind: {
                    path: "$showDate",
                    preserveNullAndEmptyArrays: true
                  }
                },
                {
                  $unwind: {
                    path: "$showTime",
                    preserveNullAndEmptyArrays: true
                  }
                },
                
                // Sort by createdAt in descending order
                {
                  $sort: {
                    createdAt: -1
                  }
                },
                
                // Project to reshape the output if needed
                {
                  $project: {
                    _id: 1,
                    userId: 1,
                    movie: "$movie",
                    showDate: "$showDate",
                    showTime: "$showTime",
                    createdAt: 1,
                    seat: 1,
                    paymentMethod: 1,
                    paymentReference: 1,
                    isClaimed: 1
                    // Add any other fields you need
                  }
                }
              ]);
            
              return all;

              
        } catch (error) {
            throw new Error("Unable to get movie")
        }
    }


    public async getBookReceipt(
        movieId : string,
        showDateId : string ,
        showTimeId : string,
        userId : string,
    ): Promise<Array<any> | Error> {
        try {

            // const reservedSeat =  await this.bookingModel.find({movieId, showDateId, showTimeId, userId}).populate([{ path: 'movieId' }, { path: 'showDateId' }, { path: 'showTimeId' } ]).exec()

            const bookingReceipts = await this.bookingModel.aggregate([
                    {
                        $match: {
                            userId: new mongoose.Types.ObjectId(userId),
                            movieId: new mongoose.Types.ObjectId(movieId),
                            showDateId: new mongoose.Types.ObjectId(showDateId),
                            showTimeId: new mongoose.Types.ObjectId(showTimeId),
                        }
                    },

                    {
                        $lookup: {
                                from: 'movies',
                                localField:"movieId",
                                foreignField: "_id",
                                as: "movie"
                        }

                    },
                    // Lookup for showDateId
                {
                    $lookup: {
                      from: "showdates", // Your show dates collection name
                      localField: "showDateId",
                      foreignField: "_id",
                      as: "showDate"
                    }
                  },
                  
                  // Lookup for showTimeId
                  {
                    $lookup: {
                      from: "showtimes", // Your show times collection name
                      localField: "showTimeId",
                      foreignField: "_id",
                      as: "showTime"
                    }
                  },
                   // Unwind the arrays created by lookups to get single objects
                {
                    $unwind: {
                      path: "$movie",
                      preserveNullAndEmptyArrays: true
                    }
                  },
                  {
                    $unwind: {
                      path: "$showDate",
                      preserveNullAndEmptyArrays: true
                    }
                  },
                  {
                    $unwind: {
                      path: "$showTime",
                      preserveNullAndEmptyArrays: true
                    }
                  },

                  {
                    $project: {
                      _id: 1,
                      userId: 1,
                      movie: "$movie",
                      showDate: "$showDate",
                      showTime: "$showTime",
                      createdAt: 1,
                      seat: 1,
                      paymentMethod: 1,
                      paymentReference: 1,
                      isClaimed: 1
                      // Add any other fields you need
                    }
                  }



            ])

            return bookingReceipts;
        } catch (error) {
            throw new Error("Unable to get a booking record")
        }
    }




    public deriveBalnce(userBalance: number | null, amount: number, isInflow: boolean){
        if(isInflow){
            return  parseInt((userBalance || 0).toString()) +  parseInt(amount.toString())
        }else{
            return  parseInt((userBalance || 0).toString()) -  parseInt(amount.toString())
        }
    }

}


export default BookingService;