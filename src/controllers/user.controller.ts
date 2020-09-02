import { Request, Response, NextFunction } from "express";
import userService from "../services/user.service";
import { JwtAuthorization } from "../utils/jwt-authorization";
import HttpResponse from "../utils/http-response";

class UserController {
  public async findAll(req: Request, res: Response, next: NextFunction) {
    const users = await userService.findAll();

    return next(HttpResponse.ok("Users found", users));
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const user = await userService.create(req.body);

    const authorization = JwtAuthorization.generate({ id: user.id });

    return next(HttpResponse.created("User created!", user, authorization));
  }

  public async findUserByUsername(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const username = (req.params["username"] as string) || "";

    const user = await userService.findByUsername(username);

    return next(HttpResponse.ok("User found", user));
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    const user = await userService.findByUsername(username);

    if (!user) return next(HttpResponse.userNotFound());

    const passwordIsCorrect = await user.checkPassword(password);

    if (!passwordIsCorrect) return next(HttpResponse.wrongPassword());

    const authorization = JwtAuthorization.generate({ id: user.id });

    return next(HttpResponse.ok("Login success!", user, authorization));
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.headers["user-id"] as string;

    const user = await userService.findById(userId);

    await user?.destroy();

    return next(HttpResponse.ok("Succefully deleted!"));
  }

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.headers["user-id"] as string;
    const { mobileToken, password } = req.body;

    const user = await userService.findById(userId);

    if (!user) {
      return next(new HttpResponse(404, "User not found"));
    }

    if (mobileToken) user.mobileToken = mobileToken;

    if (password) user.password = password;

    await user.save();

    return next(HttpResponse.ok("Succefully updated!"));
  }
}

export default new UserController();
