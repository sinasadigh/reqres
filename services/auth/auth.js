const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const { User, comparePassword, hashPassword } = require("../../models/user");

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        password = await hashPassword(password);
        const user = await User.create({ email: email, password: password });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
 
        const user = await User.findAll({ limit: 1, where: { email } })
          .then()
          .catch((err) => {
      
          });
        if (!user) {
          return done(null, false, { message: "کاربر وجود ندارد" });
        }
      
        const validate = await comparePassword(password,user[0].dataValues.password);
        if (!validate) {
          return done(null, false, { message: "پسورد اشتباه است" });
        }
        return done(null, user, { message: "با موفقیت لاگین شدید" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
passport.use(
  new JWTstrategy(
    {
      secretOrKey: "top_secret",
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      //   jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
