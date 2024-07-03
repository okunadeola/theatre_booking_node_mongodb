import Joi from 'joi';

export const register = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    role: Joi.string(),
    phone: Joi.string()
})


export const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});






export default { register, login}
