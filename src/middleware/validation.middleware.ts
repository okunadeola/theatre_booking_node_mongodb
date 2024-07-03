
import { NextFunction, Request, RequestHandler, Response } from "express";
import Joi from "joi";
import { RequestType } from "requestType";









function validationMiddleware(schema: Joi.Schema, type: RequestType): RequestHandler {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> =>{
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true
        };

        try {

         
            const value = await schema.validateAsync(
                type === RequestType.BODY ? req.body : type === RequestType.PARAMS ?  req.params : req.query,
                validationOptions
            );
            
       

            type === RequestType.BODY ? req.body = value : type ===RequestType.PARAMS  ? req.params = value :  req.query = value


           
            next()
        } catch (e: any) {
            const errors: string[] = [];

            e.details.forEach((error: Joi.ValidationError)=>{
                errors.push(error.message)
            })

            res.status(400).send({errors: errors})
        }
    }
}



export default validationMiddleware