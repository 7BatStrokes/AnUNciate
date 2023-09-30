import dotenv from "dotenv"; 
import Server from  "./Server"

dotenv.config();

const serv= new Server();

serv.listen();