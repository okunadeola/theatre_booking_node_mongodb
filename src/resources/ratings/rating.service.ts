import HttpException from "@/utils/exceptions/http.exception";
import ratingsModel from "@/resources/ratings/ratings.model";




class RatingService {

    private ratingModel = ratingsModel


    public async addRating(
        userId: string,
        rating: number,
        movieId: string,
       ): Promise<Object | Error>{
            try {

                const findrating = await this.ratingModel.findOne({userId, movieId})

                if(findrating){
                    throw new HttpException(403, "You already rate this movie")
                }

                const rate = await this.ratingModel.create({
                    userId, rating, movieId})

                return rate.toJSON()
            } catch (error: HttpException | any) {
                throw error
            }
    }



    public async getRating(id: string): Promise<Array<any> | Error>{
        try {
            const rates = await this.ratingModel.find({movieId: id})
            return rates
        } catch (error) {
            return Error("unable to get rating");
        }
    }

    public async  getAllrating():Promise<Array<any> | Error>{
        try {
            const rates = await this.ratingModel.find().sort({createdAt: -1})
            return rates
        } catch (error) {
            return Error("unable to retrieve rating");
        }
    }

    public async  getratingForMovie(userId:string, movieId:string):Promise<Array<any> | Error>{
        try {

            const rates = await this.ratingModel.find({movieId, userId})
            return rates

        } catch (error) {
            return Error("unable to retrieve rating");
        }
    }

}


export default RatingService