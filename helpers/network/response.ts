import { Response } from "express";
import { ISuccess } from "../../interfaces/Success";
import { IFail } from "../../interfaces/Fail";

export const successResponse = (
  res: Response,
  data: any,
  statusCode = 200
): void => {
  const successFetched: ISuccess = {
    success: true,
    data,
  };

  res.status(statusCode).json(successFetched);
};

export const failResponse = (
  res: Response,
  message: string,
  statusCode = 500
): void => {
  const successFetched: IFail = {
    success: false,
    message,
  };

  res.status(statusCode).json(successFetched);
};
