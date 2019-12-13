import passport from 'passport';
import passportJWT from 'passport-jwt';
import config from '../config';
import Member from '../models/member';

const JWTStrategy = passportJWT.Strategy;
const extractJWT = passportJWT.ExtractJwt;

export default () => {
  passport.serializeUser((member, done) => { // Strategy 성공 시 호출됨
    done(null, member);
  });

  passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 두 번째 인자를 받은 것
    done(null, user); // 두 번째 인자는 req.{second argument's name} 로 저장된다
  });

  passport.use(new JWTStrategy({
    jwtFromRequest: extractJWT.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: config.jwtSecret,
  }, ((payload, done) => {
    // eslint-disable-next-line no-underscore-dangle
    Member.findOneById(payload._id)
      .then((user) => {
        console.log(payload);
        console.log('payload지롱~');
        return done(null, user);
      })
      .catch((err) => {
        console.log('err지롱~');
        return done(err);
      });
  })));
};
