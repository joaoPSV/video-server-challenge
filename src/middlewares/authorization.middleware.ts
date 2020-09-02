import { Request, Response, NextFunction } from "express";
import { JwtAuthorization } from "../utils/jwt-authorization";
import HttpResponse from "../utils/http-response";

export default function authorizationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers["authorization"];

  if (!authorization || !JwtAuthorization.check(authorization)) {
    return next(HttpResponse.missingPermission());
  }

  req.headers["user-id"] = JwtAuthorization.extractClaims(authorization).id;

  next();
}
