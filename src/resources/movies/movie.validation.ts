import Joi from "joi";

export const createMovie = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    trailer: Joi.string(),
    genre: Joi.string().required(),
    dateRelease: Joi.string().required(),
    movie_length: Joi.string().required(),
    price: Joi.number().required(),
})

export const createMovieWithImgUrl = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    trailer: Joi.string(),
    imageUrl: Joi.string(),
    genre: Joi.string().required(),
    dateRelease: Joi.string().required(),
    movie_length: Joi.string().required(),
    price: Joi.number().required(),
})


export const mutateMovieParams = Joi.object({
    id: Joi.string().required(),
});

export const movieFilterQuery = Joi.object({
    limit: Joi.number().default(10),
    page: Joi.number().default(1),
});

export const getAMovieByName = Joi.object({
    cat: Joi.string().required(),
});


export const getMovieByCat = Joi.object({
    cat: Joi.string().required(),
});
export const getMovieByDates = Joi.object({
    start: Joi.string().required(),
    end: Joi.string().required(),
});


export const getMovieFilter = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    genre: Joi.string().required(),
    dateRelease: Joi.string().required(),
    length: Joi.string().required(),
    price: Joi.number().required(),
});


export const createMovieDate = Joi.object({
    date: Joi.date().required()
});



export const createShowDateTimeSchema = Joi.object({
    movieId: Joi.string().required(),
    showDateId: Joi.string().required(),
    time: Joi.string().required(),
    dateString: Joi.string().required(),
});






export default {createMovie, createMovieWithImgUrl, mutateMovieParams, getAMovieByName, getMovieFilter, createMovieDate, createShowDateTimeSchema, movieFilterQuery, getMovieByCat, getMovieByDates}