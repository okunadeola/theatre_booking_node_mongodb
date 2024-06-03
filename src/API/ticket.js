

import { showError } from "../utils";
import API from "../services/AxiosInstance";


export async function createTicketAction(json) {
    let data = await createTicket(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const createTicket = async (data) => {    
    const json = {
        message: data?.message,
        priority: data?.priority,
        title: data?.title
    }
    return API.post(`ticket/create`, json);
}

export async function replyTicketAction(json) {
    let data = await replyTicket(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const replyTicket = async (data) => {    
    const json = {
        message: data?.message,
        ticketId: data?.ticketId,
    }
    return API.post(`ticket/reply`, json);
}



export async function getUserTicketAction(json) {
    let data = await getUserTicket(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const getUserTicket = async () => {    

    return API.get(`ticket/user/`, );
}




export async function filterTicketByStatusAction(json) {
    let data = await filterTicketByStatus(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const filterTicketByStatus = async (data) => {    
    return API.get(`ticket/get-by-status/${data}`, );
}




export async function filterTicketByPriorityAction(json) {
    let data = await filterTicketByPriority(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            showError(error?.response?.data?.errors?.length ?  error?.response?.data?.errors[0]?.toString()  :  error?.response?.data?.toString())
        });

    return data
}

const filterTicketByPriority = async (data) => {    
    return API.get(`ticket/get-by-priority/${data}`, );
}












