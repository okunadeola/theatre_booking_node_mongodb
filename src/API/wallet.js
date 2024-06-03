

import { showError } from "../utils";
import API from "../services/AxiosInstance";


export async function getAllWalletAction() {
    let data = await getAllWallet()
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const getAllWallet = async () => {    
    return API.get(`wallets/getAll`);
}



export async function getAllWalletBalanceAction() {
    let data = await getAllWalletBalance()
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const getAllWalletBalance = async () => {    
    return API.get(`wallets/user_balance`);
}








