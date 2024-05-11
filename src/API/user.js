
import { showSuccess } from "../utils";
import API from "../services/AxiosInstance";






export async function loginAction(json) {
    let data = await login(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showSuccess(error?.response?.data)
        });

    return data
}

const login = async (data) => {
    const json = {
        "password":data?.password,
        "email": data?.email,
    }

    return API.post("users/login", json);
}







export async function registerBookingAction(json) {
    let data = await registerBooking(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error)
        });

    return data
}

const registerBooking = async (data) => {
    const json = {
        "phone":data?.phone,
        "full_name":data?.fullname,
        "password":'', //this can be empty,
        "email": data?.email,
        "lga": data?.lga
    }



    return API.post("user/register", json);
}