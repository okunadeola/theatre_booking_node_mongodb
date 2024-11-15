"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const mongoose_1 = __importDefault(require("mongoose"));
class App {
    constructor(controllers, port) {
        this.express = (0, express_1.default)();
        this.port = port;
        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseErrorHandling();
        this.initialiseControllers(controllers);
    }
    initialiseMiddleware() {
        this.express.use((0, helmet_1.default)());
        this.express.use((0, cors_1.default)());
        this.express.use((0, morgan_1.default)('dev'));
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: false }));
        this.express.use((0, compression_1.default)());
    }
    initialiseErrorHandling() {
        this.express.use(error_middleware_1.default);
    }
    initialiseControllers(controllers) {
        controllers.forEach((controller) => {
            this.express.use('/api', controller.router);
        });
    }
    initialiseDatabaseConnection() {
        const { MONGO_PATH } = process.env;
        mongoose_1.default.connect(`${MONGO_PATH}`).then(val => console.log("✅Synced database successfully...")).catch(e => console.log("Error connecting to the database"));
    }
    listen() {
        this.express.listen(this.port, async () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
exports.default = App;
