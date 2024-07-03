import { Router, Request, Response, NextFunction } from 'express';

import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/user/user.validation';
import UserService from '@/resources/user/user.service';
import authenticated from '@/middleware/authenticated.middleware';
import Controller from '@/utils/interfaces/controller.interface';
import { RequestType } from 'requestType';
import HttpException from '@/utils/exceptions/http.exception';
import authenticatedAdminMiddleware from '@/middleware/authenticatedAdmin.middleware';


class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private UserService = new UserService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register, RequestType.BODY),
            this.register
        );
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login, RequestType.BODY),
            this.login
        );

        this.router.get(`${this.path}`, authenticatedAdminMiddleware, this.getUser);

        this.router.get(
            `${this.path}/by_booking`, authenticatedAdminMiddleware, this.getAllUserByBooking
        )
    }

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name, email, role, username, password, phone } = req.body;

            const token = await this.UserService.register(
                name,
                email,
                password,
                role,
                username,
                phone
            );

            res.status(201).json({ token });
        }catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    };

    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;

            const data = await this.UserService.login(email, password);

            res.status(200).json({ data });
        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    };

    private getUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {

        try {
            
            const data = await this.UserService.getAllUsers()

            res.status(201).json({data})
        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    };

    private getAllUserByBooking = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            
            const data = await this.UserService.getAllBybook()

            res.status(201).json(data)
        } catch (error: HttpException | any) {
            if(error instanceof HttpException){
                return res.status(error.status).send(error.message);
            }
            return res.status(500).send(error.message);
        }
    }
}

export default UserController;
