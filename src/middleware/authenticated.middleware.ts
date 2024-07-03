import { Request, Response, NextFunction } from 'express';
import UserModel from '@/resources/user/user.model';
import jwt from 'jsonwebtoken';
import Token from '@/utils/interfaces/token.interface';
import token from '@/utils/token';



async function authenticatedMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).send("Unauthorised");
    }

    const accessToken = bearer.split('Bearer ')[1].trim();


    try {
        
        const payload: Token | jwt.JsonWebTokenError = await token.verifyToken(
            accessToken
        );

        if (payload instanceof jwt.JsonWebTokenError) {
            return res.status(401).send("Unauthorised");
        }

        const user = await UserModel.findById(payload.id).select('-password').exec() 
        
        if (!user) {
            return  res.status(401).send("Unauthorised");
        }

        req.user = user.toJSON();

        return next();
    } catch (error) {
        return res.status(401).send("Unauthorised");
    }
}

export default authenticatedMiddleware;
