"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryMultipleUpload = exports.tryUpload = void 0;
const cloud_js_1 = __importDefault(require("./cloud.js"));
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloud_js_1.default,
    params: {
        folder: 'cinema_media',
        format: async (req, file) => 'png',
    }
});
const parser = (0, multer_1.default)({ storage: storage });
exports.tryUpload = (parser.single('img'));
exports.tryMultipleUpload = (parser.array('img'));
