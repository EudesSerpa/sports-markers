import { sign } from "jsonwebtoken";
import { conf } from "../../config/config";

export const getSignedToken = (payload: any, options?: any): string =>
  sign(payload, <string>conf.jwtKey, options);
