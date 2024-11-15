"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("@/resources/user/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_1 = __importDefault(require("@/utils/token"));
async function authenticatedAdminMiddleware(req, res, next) {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).send("Unauthorised");
    }
    const accessToken = bearer.split('Bearer ')[1].trim();
    try {
        const payload = await token_1.default.verifyToken(accessToken);
        if (payload instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(401).send("Unauthorised");
        }
        const user = await user_model_1.default.findById(payload.id)
            .select('-password') // select all expt passw
            .exec();
        const userData = user?.toJSON();
        if (!userData || userData.role !== "ADMIN") {
            return res.status(401).send("Unauthorised");
        }
        req.user = userData;
        return next();
    }
    catch (error) {
        return res.status(401).send("Unauthorised");
    }
}
exports.default = authenticatedAdminMiddleware;
