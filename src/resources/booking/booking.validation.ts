import Joi from "joi";

export const createBooking = Joi.object({
    movieId: Joi.string().required(),
    showDateId: Joi.string().required(),
    showTimeId: Joi.string().required(),
    seat: Joi.string().required(),
    paymentMethod: Joi.string().required(),
    paymentReference: Joi.string(),

})



export const createBookingMultiple = Joi.object({
    movieId: Joi.string().required(),
    showDateId: Joi.string().required(),
    showTimeId: Joi.string().required(),
    seats: Joi.array().required(),
    paymentMethod: Joi.string().required(),
    paymentReference: Joi.string(),
})


export const getReservedRecord = Joi.object({
    movieId: Joi.string().required(),
    showDateId: Joi.string().required(),
    showTimeId: Joi.string().required(),
})


export const mutateBookingParams = Joi.object({
    id: Joi.string().required(),
});


export const bookingFilterQuery = Joi.object({
    limit: Joi.number().default(10),
    page: Joi.number().default(1),
});

export const byMovieBookingFilterQuery = Joi.object({
    limit: Joi.number().default(10),
    page: Joi.number().default(1),
    movieId: Joi.string().required(),
});

export const byUserBookingFilterQuery = Joi.object({
    limit: Joi.number().default(10),
    page: Joi.number().default(1),
    userId: Joi.string().required(),
});

export default {createBooking, createBookingMultiple, mutateBookingParams, getReservedRecord, bookingFilterQuery, byMovieBookingFilterQuery, byUserBookingFilterQuery}