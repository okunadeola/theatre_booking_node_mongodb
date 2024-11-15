"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("module-alias/register");
const app_1 = __importDefault(require("./app"));
const user_controller_1 = __importDefault(require("@/resources/user/user.controller"));
const validateEnv_1 = __importDefault(require("@/utils/validateEnv"));
const movie_controller_1 = __importDefault(require("./resources/movies/movie.controller"));
const booking_controller_1 = __importDefault(require("./resources/booking/booking.controller"));
const wallet_controller_1 = __importDefault(require("./resources/wallet/wallet.controller"));
const rating_controller_1 = __importDefault(require("./resources/ratings/rating.controller"));
const ticket_controller_1 = __importDefault(require("./resources/ticket/ticket.controller"));
require("./resources/schedular/UpdateExpiredShows");
(0, validateEnv_1.default)();
const app = new app_1.default([new user_controller_1.default(), new movie_controller_1.default(), new booking_controller_1.default(), new wallet_controller_1.default(), new rating_controller_1.default(), new ticket_controller_1.default()], Number(process.env.PORT));
app.listen();
