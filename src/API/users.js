

import { showError } from "../utils";
import API from "../services/AxiosInstance";


export async function getFrontMovieAction() {
    let data = await getFrontMovie()
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const getFrontMovie = async () => {    
    return API.get(`movie/bookmark/`);
}








