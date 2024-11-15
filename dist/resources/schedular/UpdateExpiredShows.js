"use strict";
// cron/updateExpiredShows.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const time_model_1 = __importDefault(require("../time/time.model"));
const date_model_1 = __importDefault(require("../date/date.model"));
// Function to check and update expired show dates and times
const updateExpiredShows = async () => {
    try {
        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1); // Get yesterday's date
        const yesterdayDateString = yesterday.toISOString().split('T')[0] + " 00:00:00"; // Format: YYYY-MM-DD 00:00:00
        const currentTimeString = now.toTimeString().split(' ')[0].slice(0, 5); // Format: HH:MM
        // Update expired show dates
        await date_model_1.default.updateMany({ date: { $lt: now } }, { $set: { isExpired: true, } });
        // Find and update show times for today that have expired
        // const todaysShowDates = await ShowDateModel.find({
        //         date: { $lt: currentDateString }
        //     }).populate({
        //         path: 'showTimes',
        //         match: {
        //             time: { $lt: currentTimeString },
        //             isExpired: false
        //         }
        //     });
        const todaysExpiredShows = await date_model_1.default.aggregate([
            {
                $match: {
                    date: { $eq: now }
                }
            },
            {
                $lookup: {
                    from: 'showtimes',
                    localField: '_id',
                    foreignField: 'showDateId',
                    as: 'showTimes'
                }
            },
        ]);
        // console.log(todaysExpiredShows, todaysExpiredShows[0], todaysExpiredShows[0]?.showTimes)
        // Update expired show times
        for (const showDate of todaysExpiredShows) {
            for (const showTime of showDate?.showTimes) {
                if (timeStringToNumber(showTime.time) <= timeStringToNumber(currentTimeString) && !showTime.isExpired) {
                    // console.log(showTime, 'showtime')
                    await time_model_1.default.findByIdAndUpdate(showTime._id, { isExpired: true });
                }
            }
        }
        // console.log('Expired show dates and times updated successfully.');
    }
    catch (error) {
        console.error('Error updating expired shows:', error);
    }
};
// Schedule the task to run once a day at midnight
node_cron_1.default.schedule('0 0 * * *', updateExpiredShows);
// Schedule the task to run every day at 1 PM
node_cron_1.default.schedule('0 13 * * *', updateExpiredShows);
// Schedule the task to run every day at 9 PM
node_cron_1.default.schedule('0 21 * * *', updateExpiredShows);
// Schedule the task to run every day at 11:30 PM
node_cron_1.default.schedule('30 23 * * *', updateExpiredShows);
// cron.schedule('*/15 * * * * *', updateExpiredShows);
function parseTimeString(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // Set the time on a Date object to the provided hours and minutes
    return date;
}
function timeStringToNumber(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 100 + minutes;
}
