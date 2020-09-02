import { Request, Response } from "express";
import HttpResponse from "../utils/http-response";

export default function responseMiddleware(
  response: HttpResponse,
  req: Request,
  res: Response,
  next: () => void
): any {
  const status = response.status || 500;
  const message = response.message || "Something went wrong";
  const data = response.data || {};

  if (response.authorization) res.set("authorization", response.authorization);

  return res.status(status).json({
    status,
    message,
    data,
  });
}
