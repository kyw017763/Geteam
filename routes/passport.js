import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT from 'passport-jwt';
import jwt from 'jsonwebtoken';
import config from '../config';
import Member from '../models/member';

const JWTStrategy = passportJWT.Strategy;
const extractJWT = passportJWT.ExtractJwt;

const LocalStrategy = passportLocal.Strategy;

export default () => {
  passport.serializeUser((member, done) => { // Strategy 성공 시 호출됨
    const payload = {
    // eslint-disable-next-line no-underscore-dangle
      _id: member._id,
      id: member.id,
      name: member.name,
    };

    const options = {
      expiresIn: 60 * 60 * 24,
    };

    jwt.sign(payload, config.jwtSecret, options, (err, token) => {
      if (err) {
        return done(null, false, { message: '오류가 발생했습니다' });
      }
      return done(null, token); // 두 번째 인자는 deserializeUser의 첫 번째 매개변수로 이동
    });
  });

  passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 두 번째 인자를 받은 것
    done(null, user); // 두 번째 인자는 req.{second argument's name} 로 저장된다
  });

  // eslint-disable-next-line new-cap
  passport.use(new LocalStrategy({ // local 전략을 세움
    usernameField: 'signin_email',
    passwordField: 'signin_pwd',
    session: true, // 세션에 저장 여부
    passReqToCallback: false,
  }, (id, password, done) => {
    Member.findOne({ id, pwd: password, isVerified: true }, (findError, member) => {
      if (findError) {
        return done(findError);
      }
      if (!member) {
        return done(null, false);
      } else {
        return done(null, member);
      }
    });
  }));

  passport.use(new JWTStrategy({
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
  }, ((payload, cb) => {
    // eslint-disable-next-line no-underscore-dangle
    return Member.findOneById(payload._id)
      .then((user) => {
        return cb(null, user);
      })
      .catch((err) => {
        return cb(err);
      });
  })));
};
