import express, {Application} from "express";
import db from "./Connection";

class Server {

    private app: Application;
    private port: String;

    constructor(){
        this.dbConnect();
        this.app= express();
        this.port= process.env.PORT || "3306";
    };

    async dbConnect() {
        try {
            await db.authenticate();
            console.log("Nice");
        } catch (er) {
            console.log(er);
        };
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log("Server Running: " + this.port)
        })
    }
};
export default Server;