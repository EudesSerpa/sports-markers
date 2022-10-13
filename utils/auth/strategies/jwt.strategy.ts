import { Strategy, ExtractJwt } from "passport-jwt";
import { conf } from "../../../config/config";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: conf.jwtKey,
};

export const JWTStrategy = new Strategy(
  options,
  (jwt_payload: Object, done: (err: any, payload: Object) => void) =>
    done(null, jwt_payload)
);
