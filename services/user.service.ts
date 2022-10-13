import { HydratedDocument } from "mongoose";
import { IUser } from "../database/interfaces/User";
import { User } from "../database/models/user.model";
import { CustomError } from "../models/custom-error.model";
import { validateId } from "../helpers/db/validateId";
import { hashPassword } from "../helpers/security/hash-password";
import { verifyPassword } from "../helpers/security/verify-password";
import { getSignedToken } from "../helpers/auth/token-sign";

export class UsersService {
  constructor() {}

  async find(): Promise<HydratedDocument<IUser>[]> {
    return await User.find({});
  }

  async findOne(id: any): Promise<HydratedDocument<IUser>> {
    validateId(id);

    const user = await User.findById(id);

    if (!user) {
      throw new CustomError("User doesn't exist", 404);
    }

    return user;
  }

  async findByUsername(
    username: string
  ): Promise<HydratedDocument<IUser>> | never {
    const user = await User.findOne({ username });

    if (!user) {
      throw new CustomError("User doesn't exist", 404);
    }

    return user;
  }

  async register({ username, password }: IUser): Promise<Object> {
    const alreadyExist = await User.exists({ username });

    if (alreadyExist) {
      throw new CustomError("User already exist", 409);
    }

    const newUser: IUser = {
      username,
      password: await hashPassword(password),
    };

    const userCreated = await User.create(newUser);

    const userData: Object = {
      _id: userCreated._id,
      username: userCreated.username,
    };

    return userData;
  }

  async login({ username, password }: IUser): Promise<Object> {
    const user = await this.findByUsername(username);

    const areCredentials: boolean = await verifyPassword(
      password,
      user.password
    );

    if (!areCredentials) {
      throw new CustomError("Invalid credentials", 403);
    }

    const payload: any = {
      sub: user._id,
      username: user.username,
    };

    const jwt = getSignedToken(payload, { expiresIn: "7d" });

    return { jwt };
  }

  async update({ id, data }: { id: any; data: {} }): Promise<IUser> {
    validateId(id);

    const userUpdated = await User.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });

    if (!userUpdated) {
      throw new CustomError("User doesn't exist", 404);
    }

    return userUpdated;
  }

  async delete(id: any): Promise<IUser | object> {
    validateId(id);

    const userDeleted = await User.findByIdAndDelete(id);

    if (!userDeleted) {
      return {
        info: "There's no any user to delete :)",
      };
    }

    return userDeleted;
  }
}
