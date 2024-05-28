
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







export async function registerAction(json) {
    let data = await register(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error)
        });

    return data
}

const register = async (data) => {
    const json = {
        "name":data?.name,
        "password":data?.password,
        "username":data?.username,
        "phone":data?.phone,
        "email": data?.email,
    }



    return API.post("users/register", json);
}