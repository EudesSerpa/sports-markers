import { Strategy } from "passport-local";
import { verifyPassword } from "../../../helpers/security/verify-password";
import { CustomError } from "../../../models/custom-error.model";
import { UsersService } from "../../../services/user.service";

const service = new UsersService();

export const LocalStrategy = new Strategy(async (username, password, done) => {
  try {
    const user = await service.findByUsername(username);

    const isMatch = await verifyPassword(password, user.password);

    if (!isMatch) {
      return done(new CustomError("Invalid credentials", 403), false);
    }

    const userData = {
      _id: user._id,
      username: user.username,
    };

    return done(null, userData);
  } catch (error) {
    done(error);
  }
});
