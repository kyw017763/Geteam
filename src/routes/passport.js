import passport from 'passport';
import passportJWT from 'passport-jwt';
import config from '../config';
import Member from '../models/member';

const JWTStrategy = passportJWT.Strategy;

export default () => {
  const cookieExtractor = (req) => {
    return req.cookies.token || null;
  };

  passport.serializeUser((member, done) => {
    // Strategy 성공 시 호출됨
    done(null, member);
  });

  passport.deserializeUser((user, done) => {
    // 매개변수 user는 serializeUser의 done의 두 번째 인자를 받은 것
    // 두 번째 인자는 req.{second argument's name} 로 저장된다
    done(null, user);
  });

  passport.use('jwt', new JWTStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: config.jwtSecret,
  }, ((payload, done) => {
    // 만약 expiresAt보다 지금이 더 뒤라면 Refresh Token을 이용하여 Access Token 재발급
    if (req.cookies.expiresAt < new Date().getTime()) {
      return done(null, false);
    } else {
      return done(null, true);
    }
  })));
};
