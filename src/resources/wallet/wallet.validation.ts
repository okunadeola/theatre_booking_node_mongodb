import Joi from "joi";

export const updateWallet = Joi.object({
    amount: Joi.number().required(),
    isInflow: Joi.bool().required(),
    note: Joi.string(),
    paymentMethod: Joi.string(),
    currency: Joi.string().required(),
    status: Joi.string().required(),
})

export const adminUpdateWallet = Joi.object({
    userId: Joi.string().required(),
    amount: Joi.number().required(),
    isInflow: Joi.bool().required(),
    note: Joi.string(),
    paymentMethod: Joi.string(),
    currency: Joi.string().required(),
    status: Joi.string().required(),
})

export const mutateWalletParams = Joi.object({
    id: Joi.string().required(),
});

export const walletFilterQuery = Joi.object({
    limit: Joi.number().default(10),
    page: Joi.number().default(1),
});



export default { updateWallet, mutateWalletParams, walletFilterQuery, adminUpdateWallet }