import express, {Application} from "express";
import db from "./Connection";
import * as UserRoutes from "../Routes/Usuario";
import cors from "cors";

class Server {

    private app: Application;
    private port: String;
    private apiPaths= {
        usuarios: "/api/usuarios"
    }

    constructor(){
        this.dbConnect();
        this.app= express();
        this.port= process.env.PORT || "3306";
        this.middlewares();
        this.routes();
        
    };

    middlewares () {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static("Public"));
    }

    routes () {
        this.app.use(this.apiPaths.usuarios, UserRoutes.default)
    }

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