import { isValidObjectId } from "mongoose";
import { CustomError } from "../models/custom-error.model";
import { ITeam } from "../interfaces/Team";
import { Team } from "../models/team.model";

export class teamService {
  constructor() {}

  // TODO: Apply inheritance
  #validateId(id: any) {
    if (!isValidObjectId(id)) {
      throw new CustomError(
        "Id is invalid. You must send a string of 12 Bytes or a string of 24 hex characters",
        400
      );
    }
  }

  async find(): Promise<ITeam[]> {
    const teams = await Team.find({});

    return teams;
  }

  async findOne(id: any): Promise<ITeam> {
    this.#validateId(id);

    const team = await Team.findById(id);

    if (!team) {
      throw new CustomError("Team doesn't exists", 404);
    }

    return team;
  }

  async create({ name, imageURI }: ITeam): Promise<ITeam> {
    const team = await Team.findOne({ name });

    if (team) {
      throw new CustomError("Team already exists", 409);
    }

    const newTeam: ITeam = {
      name,
      imageURI,
    };

    const teamCreated = await Team.create(newTeam);

    return teamCreated;
  }
}
