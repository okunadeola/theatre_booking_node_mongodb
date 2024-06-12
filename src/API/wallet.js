

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



export async function getAllWalletByIDAction(json) {
    let data = await getAllWalletByID(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const getAllWalletByID = async (data) => {    
    return API.get(`wallets/getAll/user/${data}`);
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



export async function getTotalWalletBalanceAction() {
    let data = await getTotalWalletBalance()
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const getTotalWalletBalance = async () => {    
    return API.get(`wallets/balance`);
}



export async function updateWalletBalanceAction(json) {
    let data = await updateWalletBalance(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const updateWalletBalance = async (data) => {  
    const json = {
        userId: data?.userId,
        amount: data?.amount,
        isInflow: data?.isInflow,
        note: data?.note,
        paymentMethod: data?.paymentMethod,
        currency: data?.currency,
        status: data?.status,
    }
    
    // return API.post(`wallets/update`, json);
    return API.post(`wallets/admin-update`, json);
}



export async function getAllUserWalletsForAdminAction(json) {
    let data = await getAllUserWalletsForAdmin(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const getAllUserWalletsForAdmin = async (data) => {
    return API.get(`wallet/getAll/paginated?page=${data?.page}&limit=${data?.limit}`);
}



export async function getAUserWalletsForAdminAction(json) {
    let data = await getAUserWalletsForAdmin(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const getAUserWalletsForAdmin = async (data) => {
    return API.get(`wallet/user/paginated?page=${data?.page}&limit=${data?.limit}&userId=${data?.userId}`);
}






