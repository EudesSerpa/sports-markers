import { ISport } from "../database/interfaces/Sport";
import { Sport } from "../database/models/sport.model";
import { CustomError } from "../models/custom-error.model";
import { validateId } from "../helpers/db/validateId";

export class sportService {
  constructor() {}

  async find(): Promise<ISport[]> {
    return await Sport.find({});
  }

  async findOne(id: any): Promise<ISport> {
    validateId(id);

    const sport = await Sport.findById(id);

    if (!sport) {
      throw new CustomError("Sport doesn't exist", 404);
    }

    return sport;
  }

  async create({ name }: ISport): Promise<ISport> {
    const alreadyExist = await Sport.exists({ name });

    if (alreadyExist) {
      throw new CustomError("Sport already exist", 409);
    }

    const newSport: ISport = { name };

    const sportCreated = await Sport.create(newSport);

    return sportCreated;
  }

  async update({ id, data }: { id: any; data: {} }): Promise<ISport> {
    validateId(id);

    const sportUpdated = await Sport.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });

    if (!sportUpdated) {
      throw new CustomError("Sport doesn't exists", 404);
    }

    return sportUpdated;
  }

  async delete(id: any): Promise<ISport | object> {
    validateId(id);

    const sportDeleted = await Sport.findByIdAndDelete(id);

    if (!sportDeleted) {
      return { info: "There's no any sport to delete :)" };
    }

    return sportDeleted;
  }
}
