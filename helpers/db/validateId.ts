import { isValidObjectId } from "mongoose";
import { CustomError } from "../../models/custom-error.model";

/**
 * It validate the Id.
 *
 * It throws an error if the id is not a valid MongoDB ObjectId.
 *
 * @param {any} id - any - The id that we want to validate.
 */
export const validateId = (id: any): void => {
  if (!isValidObjectId(id)) {
    throw new CustomError(
      "Id is invalid. You must send a string of 12 Bytes or a string of 24 hex characters",
      400
    );
  }
};
