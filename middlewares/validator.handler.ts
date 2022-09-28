import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { CustomError } from "../models/custom-error.model";

/**
 * It takes a Joi schema and a data location (e.g. body, params, query) and returns a middleware
 * function that validates the data in the specified location.
 *
 * @param {Schema} schema - Schema - The Joi schema that we want to validate against.
 * @param {string} dataLocation - This is the location of the data that we want to validate. For
 * example, if we want to validate the body of the request, we would pass in 'body' as the
 * dataLocation.
 * @returns A middleware function that validates the data and, if there's an error, passes it to the error handlers.
 */
export function validatorHandler(schema: Schema, dataLocation: string) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const data = (<any>req)[dataLocation];
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      next(new CustomError(error.message, 400));
    }

    next();
  };
}
