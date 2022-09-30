import { ITeam } from "../database/interfaces/Team";
import { Team } from "../database/models/team.model";
import { CustomError } from "../models/custom-error.model";
import { validateId } from "../helpers/db/validateId";

export class teamService {
  constructor() {}

  async find(): Promise<ITeam[]> {
    return await Team.find({});
  }

  async findOne(id: any): Promise<ITeam> {
    validateId(id);

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
    validateId(id);

    const teamUpdated = await Team.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });

    if (!teamUpdated) {
      throw new CustomError("Team doesn't exists", 404);
    }

    return teamUpdated;
  }

  async delete(id: any): Promise<ITeam | object> {
    validateId(id);

    const teamDeleted = await Team.findByIdAndDelete(id);

    if (!teamDeleted) {
      return {
        info: "There's no any team to delete :)",
      };
    }

    return teamDeleted;
  }
}
