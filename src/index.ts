import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import UserController from '@/resources/user/user.controller';
import validateEnv from '@/utils/validateEnv';
import MovieController from './resources/movies/movie.controller';
import BookingController from './resources/booking/booking.controller';
import WalletController from './resources/wallet/wallet.controller';
import RatingController from './resources/ratings/rating.controller';
import TicketController from './resources/ticket/ticket.controller';
import './resources/schedular/UpdateExpiredShows';

validateEnv();

const app = new App(
    [new UserController(), new MovieController(), new BookingController(), new WalletController(), new RatingController(), new TicketController()],
    Number(process.env.PORT)
);

app.listen();
