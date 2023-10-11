import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { random } from "../utils/random";
import config from "../config/index";

class AuthController {
  public static refTokens = new Array<{ username: string, refreshToken: string }>();
  private static issueToken = async (username: string) => {
    const userToken = {
      username
    };
    // generating new access token
    const token = jwt.sign(userToken, config.jwtSecret, {
      expiresIn: config.jwtExpirationSeconds
    });

    // generating refresh token
    // we should store it in database, I'm just putting it in a list
    const refreshToken = random(64);
    AuthController.refTokens.push({ username: username, refreshToken: refreshToken });
    return { accessToken: token, refreshToken: refreshToken };
  };
  static login = async (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;

    // check if username and password is correct
    // fetch data from database or some other staff
    if (username === "saman" && password === "123") {
      let newToken = await AuthController.issueToken(username);
      res.json(newToken);
    } else {
      res.sendStatus(401);
    }

  }
  static refreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.body.refreshToken;
    var foundedRefToken = AuthController.refTokens.find(x => x.refreshToken == refreshToken);
    if (foundedRefToken) {
      const token = await AuthController.issueToken(foundedRefToken.username);
      res.json({
        accessToken: token.accessToken,
        refreshToken: token.refreshToken
      });
    } else {
      res.sendStatus(401);
    }
  };
}

export default AuthController;