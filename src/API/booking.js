

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



export async function getUserBookingAction() {
    let data = await getUserBooking()
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const getUserBooking = async () => {
    return API.get("booking/user/all/");
}



export async function getAllBookingForAdminAction(json) {
    let data = await getAllBookingForAdmin(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const getAllBookingForAdmin = async (data) => {
    return API.get(`booking/paginated?page=${data?.page}&limit=${data?.limit}`);
}


export async function getAllBookingByMovieForAdminAction(json) {
    let data = await getAllBookingByMovieForAdmin(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const getAllBookingByMovieForAdmin = async (data) => {
    return API.get(`booking/by_movie/paginated?page=${data?.page}&limit=${data?.limit}&movieId=${data?.movieId}`);
}


export async function getAllBookingByUserForAdminAction(json) {
    let data = await getAllBookingByUserForAdmin(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const getAllBookingByUserForAdmin = async (data) => {
    return API.get(`booking/by_user/paginated?page=${data?.page}&limit=${data?.limit}&userId=${data?.userId}`);
}




export async function getAllBookingMoviesForAdminAction() {
    let data = await getAllBookingMoviesForAdmin()
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const getAllBookingMoviesForAdmin = async () => {
    return API.get(`movie/by_booking`);
}




export async function getAllBookingUsersForAdminAction() {
    let data = await getAllBookingUsersForAdmin()
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const getAllBookingUsersForAdmin = async () => {
    return API.get(`users/by_booking`);
}


export async function claimBookingAction(bookingId) {
    let data = await claimBooking(bookingId)
        .then(async (response) => {
            return {data: response.data, success: true};
        })
        .catch((error) => {
            const err = error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString()

            showError(err)
            return {data: err, success:false};
        });

    return data
}

const claimBooking = async bookingId => {
    return API.patch(`booking/update-booking-claim/${bookingId}`);
}


