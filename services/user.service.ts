import { isValidObjectId } from "mongoose";
import { CustomError } from "../models/custom-error.model";
import { IUser } from "../database/interfaces/User";
import { User } from "../database/models/user.model";

export class UsersService {
  constructor() {}

  #validateId(id: any) {
    if (!isValidObjectId(id)) {
      throw new CustomError(
        "Id is invalid. You must send a string of 12 Bytes or a string of 24 hex characters",
        400
      );
    }
  }

  async find(): Promise<IUser[]> {
    const users = await User.find({});

    return users;
  }

  async findOne(id: any): Promise<IUser> {
    this.#validateId(id);

    const user = await User.findById(id);

    if (!user) {
      throw new CustomError("User doesn't exists", 404);
    }

    return user;
  }

  async create({ username, password }: IUser): Promise<IUser> {
    const user = await User.findOne({ username });

    if (user) {
      throw new CustomError("User already exists", 409);
    }

    const newUser: IUser = {
      username,
      password,
    };

    const userCreated = await User.create(newUser);

    return userCreated;
  }

  async update({
    id,
    username,
  }: {
    id: any;
    username: string;
  }): Promise<IUser> {
    this.#validateId(id);

    const userUpdated = await User.findByIdAndUpdate(
      id,
      { username },
      { returnDocument: "after" }
    );

    if (!userUpdated) {
      throw new CustomError("User doesn't exists", 404);
    }

    return userUpdated;
  }

  async delete(id: any): Promise<IUser | object> {
    this.#validateId(id);

    const userDeleted = await User.findByIdAndDelete(id);

    if (!userDeleted) {
      return {
        info: "There's no any user to delete :)",
      };
    }

    return userDeleted;
  }
}
