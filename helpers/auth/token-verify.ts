import { verify } from "jsonwebtoken";
import { conf } from "../../config/config";
import { CustomError } from "../../models/custom-error.model";

export const verifyToken = (jwt: string): void | any => {
  const decodedPayload: any = verify(
    jwt,
    <string>conf.jwtKey,
    (err, decoded) => {
      if (err) {
        throw new CustomError(err.message, 401);
      }

      return decoded;
    }
  );

  return decodedPayload;
};
