import { Request, Response, NextFunction } from "express";
import { CustomError } from "../models/custom-error.model";
import { IFail } from "../interfaces/Fail";

/**
 * Log the error.
 *
 * @param {Error} err - Error - the error object
 * @param {Request} _req - Request - The request object (Not used)
 * @param {Response} _res - Response - The response object (Not used)
 * @param {NextFunction} next - NextFunction - Function to pass control to the next handler
 */
export function logErrors(
  err: Error,
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  console.log("🚀 ~ file: error.handler.ts ~ line 11 ~ err", err.message);
  next(err);
}

/**
 * Send the error to the client.
 *
 * @param {Error | CustomError} err - Error | CustomError: This is the error object that is passed to
 * the error handler
 * @param {Request} _req - Request - The request object (Not used)
 * @param {Response} res - Response - The response object
 * @param {NextFunction} _next - NextFunction - Function to pass control to the next handler (Not used)
 */
export function errorHandler(
  err: Error | CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  let customError = err;

  if (!(err instanceof CustomError)) {
    customError = new CustomError(err.message);
  }

  const failMessage: IFail = {
    success: false,
    message: customError.message,
  };

  res.status((customError as CustomError).statusCode).json(failMessage);
}
