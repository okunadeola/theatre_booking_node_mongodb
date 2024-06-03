
import { showSuccess } from "../utils";
import API from "../services/AxiosInstance";






export async function createRatingAction(json) {
    let data = await createRating(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showSuccess(error?.response?.data)
        });

    return data
}

const createRating = async (data) => {
    const json = {
        "rating":data?.rating,
        "movieId": data?.movieId,
    }

    return API.post("rating/create", json);
}



export async function getRatingAction(json) {
    let data = await getRating(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showSuccess(error?.response?.data)
        });

    return data
}

const getRating = async (json) => {

    return API.get(`rating/get_by_user_and_movie/${json}`, );
}







