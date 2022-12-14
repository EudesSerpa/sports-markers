import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/User";

const userSchema: Schema = new Schema<IUser>(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required"],
    },
    password: { type: String, required: [true, "Password is required"] },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);
