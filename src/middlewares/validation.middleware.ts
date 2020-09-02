import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import * as express from "express";
import HttpResponse from "../utils/http-response";

export default function validationMiddleware<T>(
  type: any
): express.RequestHandler {
  return (req, res, next) => {
    validate(plainToClass(type, req.body)).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        let data: string[] = [];
        for (const error of errors) {
          data = data.concat(Object.values(error.constraints!));
        }

        next(new HttpResponse(422, "Invalid params", data));
      } else {
        next();
      }
    });
  };
}
