import { model, Schema } from "mongoose";
import { ITeam } from "../interfaces/Team";

const teamSchema: Schema = new Schema<ITeam>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Team must have a name"],
    },
    imageURI: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Team = model<ITeam>("Team", teamSchema);
