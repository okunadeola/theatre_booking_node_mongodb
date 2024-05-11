

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






export async function getPaginatedMoviesAction(json) {
    let data = await getPaginatedMovies(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            // console.log(error)
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const getPaginatedMovies = async (data) => {
    return API.get(`movie/paginated?page=${data?.page}&limit=${data?.limit}`);
}



