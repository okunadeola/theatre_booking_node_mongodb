

import { showError } from "../utils";
import API from "../services/AxiosInstance";





export async function createMovieAction(json) {
    let data = await createMovie(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            // console.log(error)
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const createMovie = async (data) => {
    const json ={
        title: data?.title,
        description:data?.description,
        img: data?.img,
        trailer: data?.trailer || '',
        genre: data?.genre,
        dateRelease: data?.dateRelease,
        movie_length: data?.movie_length,
        price: data?.price,
    }

    return API.post("movie/create/", json);
}



export async function createMovieWithImageUrlAction(json) {
    let data = await createMovieWithImgUrl(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            // console.log(error)
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const createMovieWithImgUrl = async (data) => {
    const json ={
        title: data?.title,
        description:data?.description,
        imageUrl: data?.img,
        trailer: data?.trailer || '',
        genre: data?.genre,
        dateRelease: data?.dateRelease,
        movie_length: data?.movie_length,
        price: data?.price,
    }
    return API.post("movie/create-with-image-url", json);
}






export async function getPaginatedMoviesAction(json) {
    let data = await getPaginatedMovies(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const getPaginatedMovies = async (data) => {
    return API.get(`movie/paginated?page=${data?.page}&limit=${data?.limit}`);
}



export async function createShowDateAction(json) {
    let data = await createShowDate(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const createShowDate = async (data) => {
    const json ={
        date: data?.date,
    }
    
    return API.post(`movie/create-cinema-dates/${data.movieId}`, json);
}

export async function getMovieShowDateAction(json) {
    let data = await getMovieShowDate(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const getMovieShowDate = async (data) => {
    
    return API.get(`movie/get-shows-dates-by-movie/${data.movieId}`,);
}


export async function getMovieShowDateTimesAction(json) {
    let data = await getMovieShowDateTimes(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const getMovieShowDateTimes = async (data) => {
    return API.get(`movie/get-shows-time-by-date/${data.dateId}`,);
}




export async function createShowDateTimeAction(json) {
    let data = await createShowDateTime(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const createShowDateTime = async (data) => {
    const json ={
        movieId:data?.movieId,
        showDateId:data?.showDateId,
        time:data?.time,
        dateString:data?.dateString,
    }
    
    return API.post(`movie/create-show-date-time/`, json);
}



