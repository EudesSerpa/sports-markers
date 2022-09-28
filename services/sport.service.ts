import { isValidObjectId } from "mongoose";
import { CustomError } from "../models/custom-error.model";
import { ISport } from "../database/interfaces/Sport";
import { Sport } from "../database/models/sport.model";

export class sportService {
  constructor() {}

  #validateId(id: any) {
    if (!isValidObjectId(id)) {
      throw new CustomError(
        "Id is invalid. You must send a string of 12 Bytes or a string of 24 hex characters",
        400
      );
    }
  }

  async find(): Promise<ISport[]> {
    return await Sport.find({});
  }

  async findOne(id: any): Promise<ISport> {
    this.#validateId(id);

    const sport = await Sport.findById(id);

    if (!sport) {
      throw new CustomError("Sport doesn't exists", 404);
    }

    return sport;
  }

  async create({ name }: ISport): Promise<ISport> {
    const sport = await Sport.findOne({ name });

    if (sport) {
      throw new CustomError("Sport already exists", 409);
    }

    const newSport: ISport = { name };

    const sportCreated = await Sport.create(newSport);

    return sportCreated;
  }

  async update({ id, data }: { id: any; data: {} }): Promise<ISport> {
    this.#validateId(id);

    const sportUpdated = await Sport.findByIdAndUpdate(
      id,
      { ...data },
      { returnDocument: "after" }
    );

    if (!sportUpdated) {
      throw new CustomError("Sport doesn't exists", 404);
    }

    return sportUpdated;
  }

  async delete(id: any): Promise<ISport | object> {
    this.#validateId(id);

    const sportDeleted = await Sport.findByIdAndDelete(id);

    if (!sportDeleted) {
      return { info: "There's no any sport to delete :)" };
    }

    return sportDeleted;
  }
}
