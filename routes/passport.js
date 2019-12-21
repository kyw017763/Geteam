import passport from 'passport';
import passportJWT from 'passport-jwt';
import jwt from 'jsonwebtoken';
import config from '../config';
import Member from '../models/member';

const JWTStrategy = passportJWT.Strategy;
const extractJWT = passportJWT.ExtractJwt;

export default () => {
  const cookieExtractor = (req) => {
    return req.cookies.token || null;
  };

  const refreshCookieExtractor = (req) => {
    return req.cookies.refreshToken || null;
  };

  passport.serializeUser((member, done) => { // Strategy 성공 시 호출됨
    done(null, member);
  });

  passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 두 번째 인자를 받은 것
    done(null, user); // 두 번째 인자는 req.{second argument's name} 로 저장된다
  });

  passport.use('jwt', new JWTStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: config.jwtSecret,
  }, ((payload, done) => {
    // eslint-disable-next-line no-underscore-dangle
    Member.findOne({ _id: payload._id })
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(true, user);
        }
      })
      .catch((err) => {
        return done(err);
      });
  })));

  passport.use('jwtRefresh', new JWTStrategy({
    jwtFromRequest: refreshCookieExtractor,
    secretOrKey: config.refreshTokenSecret,
  }, ((payload, done) => {
    // eslint-disable-next-line no-underscore-dangle
    Member.findOne({ _id: payload._id })
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(true, user);
        }
      })
      .catch((memberErr) => {
        if (memberErr) {
          return done(true);
        }
      });
  })));
};
