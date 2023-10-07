import dotenv from "dotenv"; 
import Server from  "./Server";
import Help from "../Functions/Help";
import * as Funcs from "../Functions/Funcs";

dotenv.config();

const serv= new Server();
serv.listen();

console.log("Check");
Help("str2hsh")
try {
    Funcs.createUser("David", "Garcia", "davidgar@outlook.com", "12345678", "none", "Ingenieria", "Bogota")
    Funcs.updateUser("e67a6b85-ce46-49ef-a8da-57a2bb3ff1e2", "I-am-the-Knight08", "Bruno", "Diaz", undefined, undefined, "Palmira")
} catch (error) {
    console.log(error)
}
