import Joi from "joi";

export const addRating = Joi.object({
    rating: Joi.number().min(0).max(5).required(),
    movieId: Joi.string().required(),

})

export const mutateRatingParams = Joi.object({
    id: Joi.string().required(),
});





export default { addRating, mutateRatingParams }