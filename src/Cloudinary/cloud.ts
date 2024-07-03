require("dotenv").config();
import cloudinary from 'cloudinary'

const cloud = cloudinary.v2



cloud.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SEC
});








export default cloud;