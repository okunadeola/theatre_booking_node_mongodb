import User from '@/resources/user/user.interface';

declare global {
    namespace Express {
        export interface Request {
            user: User;
            // file:Express.Multer.File | undefined
        }
    }
}

declare module 'jsonwebtoken';
declare module 'bcrypt';
declare module 'node-cron';
declare module 'multer';
declare module 'cors';
declare module 'morgan';
declare module 'compression';


// declare module 'express' {
//     interface Request {
//       body: any // Actually should be something like `multer.Body`
//       file: any // Actually should be something like `multer.Files`
//       params:any
//       query:any
//       files: any
//     }
//   }