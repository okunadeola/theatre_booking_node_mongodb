import { Request } from 'express';
import cloudinary from './cloud.js'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'





const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:  {
      folder: 'cinema_media',
      format: async (req: Request, file: any) => 'png',
    } as any
  });





  
  const parser = multer({ storage: storage });
    
export const tryUpload = (parser.single('img'))
export const tryMultipleUpload = (parser.array('img'))
  