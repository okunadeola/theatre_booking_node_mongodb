

import { showError } from "../utils";
import API from "../services/AxiosInstance";





export async function getAllReservedAction(json) {
    let data = await getAllReserved(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const getAllReserved = async (data) => {
    const json ={
        movieId: data?.movieId,
        showDateId: data?.showDateId,
        showTimeId: data?.showTimeId,
    }

    return API.post("booking/reserved-record", json);
}




export async function bookingAction(json) {
    let data = await booking(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const booking = async (data) => {

    const json ={
        movieId: data?.movieId,
        showDateId: data?.showDateId,
        showTimeId: data?.showTimeId,
        seat: data?.seat,
        paymentMethod: data?.paymentMethod,
        paymentReference: data?.paymentReference,
    }

    return API.post("booking/create", json);
}


export async function MultibookingAction(json) {
    let data = await Multibooking(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString(), 7000)
        });

    return data
}

const Multibooking = async (data) => {

    const json ={
        movieId: data?.movieId,
        showDateId: data?.showDateId,
        showTimeId: data?.showTimeId,
        seats: data?.seat,
        paymentMethod: data?.paymentMethod,
        paymentReference: data?.paymentReference,
    }

    return API.post("booking/create-multiple", json);
}



export async function getBookingAction(val) {
    let data = await getBooking(val)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const getBooking = async (data) => {
    const json ={
        movieId: data?.movieId,
        showDateId: data?.showDateId,
        showTimeId: data?.showTimeId,
    }

    return API.post("booking/date-time/all/", json );
}


