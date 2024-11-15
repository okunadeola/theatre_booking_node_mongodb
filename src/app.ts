import express, { Application } from "express";

import helmet from "helmet";
import cors from 'cors'
import morgan from "morgan";
import compression from "compression";
import errorMiddleware from "./middleware/error.middleware";
import mongoose from "mongoose";
import Controller from "@/utils/interfaces/controller.interface"




class App {
    public express : Application
    public port : number

    constructor(controllers: Controller[], port: number){
        this.express = express()
        this.port = port

        this.initialiseDatabaseConnection()
        this.initialiseMiddleware()
        this.initialiseErrorHandling()
        this.initialiseControllers(controllers)
    }




    private initialiseMiddleware():void{
        this.express.use(helmet())
        this.express.use(cors())
        this.express.use(morgan('dev'))
        this.express.use(express.json())
        this.express.use(express.urlencoded({extended: false}))
        this.express.use(compression())
    }

    private initialiseErrorHandling():void{
        this.express.use(errorMiddleware)
    }


    private initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller)=>{
            this.express.use('/api', controller.router)
        })
    }

    private initialiseDatabaseConnection(): void {
        const { MONGO_PATH } = process.env;

        mongoose.connect(
            `${MONGO_PATH}`
        ).then(val=> console.log("✅Synced database successfully...")).catch(e=> console.log("Error connecting to the database"));
    }

    public listen(): void {
        this.express.listen(this.port, async () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}


export default App