import { Request, Response } from "express";

class UserController {
    static check = async(req:Request,res:Response) => {
        res.send("You're authorized!");
    }
}

export default UserController;