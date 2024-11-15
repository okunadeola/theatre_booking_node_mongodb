"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validationMiddleware(schema, type) {
    return async (req, res, next) => {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true
        };
        try {
            const value = await schema.validateAsync(type === 0 /* RequestType.BODY */ ? req.body : type === 1 /* RequestType.PARAMS */ ? req.params : req.query, validationOptions);
            type === 0 /* RequestType.BODY */ ? req.body = value : type === 1 /* RequestType.PARAMS */ ? req.params = value : req.query = value;
            next();
        }
        catch (e) {
            const errors = [];
            e.details.forEach((error) => {
                errors.push(error.message);
            });
            res.status(400).send({ errors: errors });
        }
    };
}
exports.default = validationMiddleware;
