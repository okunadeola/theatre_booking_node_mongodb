import HttpException from '@/utils/exceptions/http.exception';
import { Request, Response, NextFunction } from 'express';



function errorMiddleware(
    error: HttpException,
    req: Request,
    res: Response,
    _next: NextFunction
): void {
    // console.log(error.message)
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    res.status(status).send({
        status,
        message,
    });
}

export default errorMiddleware;