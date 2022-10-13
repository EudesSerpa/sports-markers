import passport from "passport";
import { JWTStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

passport.use(LocalStrategy);
passport.use(JWTStrategy);
