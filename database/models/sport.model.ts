import { model, Schema } from "mongoose";
import { ISport } from "../interfaces/Sport";

const sportSchema: Schema = new Schema<ISport>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Sport must be identified with a name"],
    },
  },
  {
    timestamps: true,
  }
);

export const Sport = model<ISport>("Sport", sportSchema);
