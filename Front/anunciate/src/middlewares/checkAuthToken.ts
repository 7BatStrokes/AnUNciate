import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config";

export const checkAuthToken = function(req: Request, res: Response, next: NextFunction) {
		const token = <string>req.headers.authorization;
		let jwtPayload;
		try {
			// check if access token is valid
			jwtPayload = <any>jwt.verify(token, config.jwtSecret);
			res.locals.jwtPayload = jwtPayload;
			// extract username from payload and place it in response locals
			res.locals.username = jwtPayload["username"];
		} catch (error) {
			res.status(401).send();
			return;
		}
		next();
	
};