import express, {
  Application,
  json,
  Request,
  Response,
  NextFunction,
} from "express";

import roomRoutes from "./routes/room.routes";
import userRoutes from "./routes/user.routes";
import sequelize from "./database/database";

import responseMiddleware from "./middlewares/response.middleware";
import authorizationMiddleware from "./middlewares/authorization.middleware";

class App {
  public express: Application;

  constructor() {
    this.express = express();

    this.database();
    this.initializeMiddlewares();
    this.routes();
    this.initializeResponseHandling();
  }

  private excludeFromMiddleware(
    paths: { url: RegExp; method: string }[],
    middleware: any
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      for (const path of paths) {
        if (path.url.test(req.path) && path.method === req.method)
          return next();
      }
      return middleware(req, res, next);
    };
  }

  private initializeMiddlewares(): void {
    this.express.use(json());
    this.express.use(
      this.excludeFromMiddleware(
        [
          { url: RegExp(/^\/v1\/users$/g), method: "GET" },
          { url: RegExp(/^\/v1\/users\//g), method: "GET" },
          { url: RegExp(/^\/v1\/users$/g), method: "POST" },
          { url: RegExp(/^\/v1\/users\/login$/g), method: "POST" },
          { url: RegExp(/^\/v1\/rooms$/g), method: "GET" },
          { url: RegExp(/^\/v1\/rooms\//g), method: "GET" },
          { url: RegExp(/^\/v1\/rooms\/users\//g), method: "GET" },
        ],
        authorizationMiddleware
      )
    );
  }

  private initializeResponseHandling() {
    this.express.use(responseMiddleware);
  }

  private async database(): Promise<void> {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database");
    }
  }

  private routes(): void {
    this.express.use("/v1/rooms", roomRoutes);
    this.express.use("/v1/users", userRoutes);
  }
}

export default new App().express;
