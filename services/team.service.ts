import { isValidObjectId } from "mongoose";
import { CustomError } from "../models/custom-error.model";
import { ITeam } from "../database/interfaces/Team";
import { Team } from "../database/models/team.model";

export class teamService {
  constructor() {}

  #validateId(id: any) {
    if (!isValidObjectId(id)) {
      throw new CustomError(
        "Id is invalid. You must send a string of 12 Bytes or a string of 24 hex characters",
        400
      );
    }
  }

  async find(): Promise<ITeam[]> {
    return await Team.find({});
  }

  async findOne(id: any): Promise<ITeam> {
    this.#validateId(id);

    const team = await Team.findById(id);

    if (!team) {
      throw new CustomError("Team doesn't exist", 404);
    }

    return team;
  }

  async create({ name, imageURI }: ITeam): Promise<ITeam> {
    const alreadyExist = await Team.exists({ name });

    if (alreadyExist) {
      throw new CustomError("Team already exist", 409);
    }

    const newTeam: ITeam = {
      name,
      imageURI,
    };

    const teamCreated = await Team.create(newTeam);

    return teamCreated;
  }

  async update({ id, data }: { id: any; data: {} }): Promise<ITeam> {
    this.#validateId(id);

    const teamUpdated = await Team.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });

    if (!teamUpdated) {
      throw new CustomError("Team doesn't exists", 404);
    }

    return teamUpdated;
  }

  async delete(id: any): Promise<ITeam | object> {
    this.#validateId(id);

    const teamDeleted = await Team.findByIdAndDelete(id);

    if (!teamDeleted) {
      return {
        info: "There's no any team to delete :)",
      };
    }

    return teamDeleted;
  }
}
