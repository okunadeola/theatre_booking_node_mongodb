import Joi from "joi";

export const createTicket = Joi.object({
    message: Joi.string().required(),
    priority: Joi.string().optional(),
    title: Joi.string().required()
})

export const mutateTicketParams = Joi.object({
    id: Joi.string().required(),
});


export const updateTicket = Joi.object({
    id: Joi.string().required(),
    status: Joi.string().required(),
});


export const replyTicket = Joi.object({
    message: Joi.string().required(),
    ticketId: Joi.string().required(),
})
 



export default { createTicket, mutateTicketParams,replyTicket, updateTicket}