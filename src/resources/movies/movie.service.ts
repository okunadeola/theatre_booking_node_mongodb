import HttpException from "@/utils/exceptions/http.exception";
import MoviesModel from '@/resources/movies/movie.model';
import ShowDateModel from '@/resources/date/date.model';
import ShowTimeModel from '@/resources/time/time.model';
import Movie from '@/resources/movies/movie.interface';

import BookingModel from "../booking/booking.model";
import { Document } from "mongoose";
import ShowTime from "../time/time.interface";




class MovieService {
    private movies = MoviesModel;
    private showDate = ShowDateModel;
    private showTime = ShowTimeModel;



    public async create(
        data:any): Promise<Movie | Error> {
        try {


            const findMovie = await this.movies.findOne({title : data?.title})

            if(findMovie){
                throw new HttpException(403, "Movie with the title exist already")
            }
            const movie = await this.movies.create({
                ...data
            })

            return  movie.toJSON();
        } catch (error: HttpException | any) {
            throw error
        }
    }


    public async getAll(): Promise<Array<Movie> | Error> {
        try {

            const all = await this.movies.find()

            return all;
        } catch (error) {
            throw new Error("Unable to get movie")
        }
    }



    public async getByCategory(cat: string | any): Promise<Array<Movie> | Error> {
        try {

            // const all =  await this.movies.find({genre: {$regex : cat, $options: 'i'}}).populate('showDates').exec()
            const allMovies = await this.movies.aggregate([
                {
                    $lookup: {
                        from: 'showdates',
                        localField: '_id',
                        foreignField: 'movie',
                        as: 'showDates'
                    }
                },
                {
                    $match: {genre: {$regex : cat, $options: 'i'}}
                },
                {
                    $project: {
                        title: 1,
                        description: 1,
                        img: 1,
                        trailer: 1,
                        genre: 1,
                        dateRelease: 1,
                        movie_length: 1,
                        price: 1,
                        showDates: 1
                    }
                }
            ]);

            return allMovies;
        } catch (error) {
            throw new Error("Unable to get movie")
        }
    }


    public async getBookmarked(): Promise<Array<Movie> | Error> {
        try {
  
            // const all = await this.movies.find({
            //     trailer: { $ne: null }
            // })
            // .sort({ createdAt: -1 }) //desc order
            // .populate('showDates').exec();

            const allMovies = await this.movies.aggregate([
                {
                    $lookup: {
                        from: 'showdates',
                        localField: '_id',
                        foreignField: 'movie',
                        as: 'showDates'
                    }
                },
                {
                    $match: {trailer: { $ne: null }} //not equal to null
                },
                {
                    $sort: { createdAt: -1 }
                },
                {
                    $project: {
                        title: 1,
                        description: 1,
                        img: 1,
                        trailer: 1,
                        genre: 1,
                        dateRelease: 1,
                        movie_length: 1,
                        price: 1,
                        showDates: 1
                    }
                }
            ]);

            return allMovies;
        } catch (error) {
            throw new Error("Unable to get movie")
        }
    }




    public async getByDate(start: string | any, end: string | any): Promise<Array<any> | Error> {
        try {
            const allMovies = await this.movies.aggregate([
                {
                    $lookup: {
                        from: 'showdates',
                        localField: '_id',
                        foreignField: 'movie',
                        as: 'showDates'
                    }
                },
                {
                    $addFields: {
                        showDates: {
                            $filter: {
                                input: '$showDates',
                                as: 'showDate',
                                cond: {
                                    $and: [
                                        { $gte: ['$$showDate.date', new Date(start)] },
                                        { $lte: ['$$showDate.date', new Date(end)] }
                                    ]
                                }
                            }
                        }
                    }
                },
                {
                    $match: {
                        showDates: { $exists: true, $not: { $size: 0 } } // Only include movies with showDates in the specified range
                    }
                },
                {
                    $project: {
                        title: 1,
                        description: 1,
                        img: 1,
                        trailer: 1,
                        genre: 1,
                        dateRelease: 1,
                        movie_length: 1,
                        price: 1,
                        showDates: 1
                    }
                }
            ]);
            
            return allMovies;
            

            // const all = await this.showDate.find({
            //     // date: { $in: [start, end] }
            //     date: {
            //         $gte: start, 
            //         $lte: end
            //      }
            // })
            // .populate({path:'movie' }).exec();

            // return all;
        } catch (error) {
            throw new Error("Unable to get movie")
        }
    }



    public async getByBooking(): Promise<Array<any> | Error> {
        try {

            const allMovies = await this.movies.aggregate([
                {
                    $lookup: {
                        from: 'bookings', // Collection name in MongoDB (usually the model name in lowercase + 's')
                        localField: '_id',
                        foreignField: 'movieId',
                        as: 'bookings'
                    }
                },
                {
                    $project: {
                        title: 1,
                        description: 1,
                        img: 1,
                        trailer: 1,
                        genre: 1,
                        dateRelease: 1,
                        movie_length: 1,
                        price: 1,
                        bookings: {
                            $map: {
                                input: "$bookings",
                                as: "booking",
                                in: { id: "$$booking._id" }
                            }
                        }
                    }
                }
            ]);
        
            return allMovies;
        } catch (error) {
            throw new Error("Unable to get movie")
        }
    }





    public async getAllPaginated(
        pageQ: string | any, 
        limitQ: string | any
      ): Promise<Object | Error> {
        try {
          const page = parseInt((pageQ || 1).toString());
          const limit = parseInt((limitQ || 10).toString());
          const skip = (page - 1) * limit;
      
          // Using aggregation pipeline for efficient querying
          const [result] = await this.movies.aggregate([
            // First get the total count
            {
              $facet: {
                totalCount: [{ $count: 'count' }],
                movies: [
                  // Lookup ratings
                  {
                    $lookup: {
                      from: 'ratings',
                      localField: '_id',
                      foreignField: 'movieId',
                      as: 'ratings'
                    }
                  },
                  // Lookup show dates
                  {
                    $lookup: {
                      from: 'showdates',
                      localField: '_id',
                      foreignField: 'movie',
                      as: 'showDates'
                    }
                  },
                  // Calculate average rating
                  {
                    $addFields: {
                      averageRating: {
                        $cond: [
                          { $gt: [{ $size: '$ratings' }, 0] },
                          { 
                            $divide: [
                              { $reduce: {
                                  input: '$ratings',
                                  initialValue: 0,
                                  in: { $add: ['$$value', '$$this.rating'] }
                                }
                              },
                              { $size: '$ratings' }
                            ]
                          },
                          0
                        ]
                      },
                      ratingsCount: { $size: '$ratings' }
                    }
                  },
                  // Project only needed fields from ratings etc
                  {
                    $project: {
                      title: 1,
                      description: 1,
                      img: 1,
                      trailer: 1,
                      genre: 1,
                      dateRelease: 1,
                      movie_length: 1,
                      price: 1,
                      // Add other movie fields you need
                      showDates: 1,
                      averageRating: 1,
                      ratingsCount: 1,
                      'ratings': {
                        $map: {
                          input: '$ratings',
                          as: 'rating',
                          in: {
                            rating: '$$rating.rating',
                            userId: '$$rating.userId'
                          }
                        }
                      }
                    }
                  },
                  // Pagination
                  { $skip: skip },
                  { $limit: limit }
                ]
              }
            }
          ]).exec();
      
          const totalCount = result.totalCount[0]?.count || 0;
          const nextPage = (page * limit) < totalCount ? page + 1 : null;


      
          return {
            movies: result.movies,
            totalCount,
            nextPage
          };
        } catch (error) {
          throw new Error(`Unable to get movies: ${(error as any)?.message}`);
        }
      }
      


    public async getAllPaginated2(pageQ: string | any, limitQ:string | any): Promise<Object | Error> {
        try {

            const page = parseInt((pageQ || 1).toString())
            const limit = parseInt((limitQ || 10).toString())
            const skip = (page - 1) * limit;

            const totalCount = await this.movies.countDocuments()

            // console.log(totalCount)

            const all = await this.movies.find()   
            .limit(limit)
            .skip(skip)
            .populate([{path: "ratings", select: "rating, userId"}, {path:"showDates"}])
            .exec();


            // console.log(totalCount, all)

            all?.forEach(movie => {
                let totalStars = 0;
                movie?.ratings?.forEach((rate: any )=> {
                  totalStars += rate.rating;
                });
                const averageRating = movie.ratings.length > 0 ? totalStars / movie.ratings.length : 0;
                // Add average rating property to each movie object
                movie.averageRating = averageRating;
              });


            const nextPage = (page * limit) <= totalCount  ? page + 1 : null;
            
            

            return {movies: all, totalCount, nextPage};
        } catch (error) {
            throw new Error("Unable to get movie")
        }
    }














    public async createDates(
        movie:string, date: Date): Promise<Movie | Error> {
        try {


            const findDate = await this.showDate.findOne({ date : date})

            if(findDate){
                throw new HttpException(403, "Show with same date already exist") 
            }

            const movieDate = await this.showDate.create({
                movie, date
            })

            return movieDate.toJSON();
        } catch (error: HttpException | any) {
            throw error
        }
    }


    public async getAllShowDate(): Promise<Array<any> | Error> {
        try {

            const all = await this.showDate.find().populate({path: "movie"})

            return all;
        } catch (error) {
            throw new Error("Unable to get all show dates")
        }
    }


    public async getAllShowDateByMovie(movieId:string): Promise<Array<any> | Error> {
        try {

            const all = await this.showDate.find({movie: movieId}).populate({path: "movie"})

            return all;
        } catch (error) {
            throw new Error("Unable to get all show dates")
        }
    }



















    public async creaMovieTimeForShow(
        movieId:string, showDateId: string, time: string, dateString: string): Promise<ShowTime | Error> {
        try {
            // time = 11:20:00
            //date = 2024-04-09 00:00:00 
            const findDate = await this.showDate.findOne({ date : dateString})

            // const findTime= await this.showTime.findOne({ time : `${time}:00`})
            const findTime= await this.showTime.findOne({ time : `${time}`})

            if(findDate && findTime){
                throw new HttpException(403, "Show with same date and time already exist") 
            }

            const timeDoc = await this.showTime.create({
                movieId, showDateId, time
            })

            return timeDoc.toJSON();
        }  catch (error: HttpException | any) {
            if(error instanceof HttpException){
                throw error;
            }
            throw new Error("Unable to create a show time");
        }
    }


    public async getAllShowTime(): Promise<Array<any> | Error> {
        try {

            const all = await this.showTime.find().populate({path: 'showDateId'})

            return all;
        } catch (error) {
            throw new Error("Unable to get all show dates")
        }
    }



    public async getAllShowTimeByDate(dateId:string): Promise<Array<any> | Error> {
        try {

            const all = await this.showTime.find({showDateId:dateId})

            return all;
        } catch (error) {
            throw new Error("Unable to get all show date time")
        }
    }





}


export default MovieService;