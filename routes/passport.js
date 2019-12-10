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
    const encryptedId = crypto.createHmac('sha256', config.jwtSecret)
      .update(member.id)
      .digest('base64');

    const payload = {
    // eslint-disable-next-line no-underscore-dangle
      _id: member._id,
      name: member.name,
    };

    const options = {
      expiresIn: 60 * 60 * 24,
    };

    jwt.sign(payload, config.jwtSecret, options, (err, token) => {
      if (err) {
        return done(null, false, { message: '오류가 발생했습니다' });
      }
      return done(null, encryptedId); // 두 번째 인자는 deserializeUser의 첫 번째 매개변수로 이동
    });
  });

  passport.deserializeUser((userId, done) => { // 매개변수 user는 serializeUser의 done의 두 번째 인자를 받은 것
    done(null, userId); // 두 번째 인자는 req.{second argument's name} 로 저장된다
  });

  // eslint-disable-next-line new-cap
  passport.use(new LocalStrategy({ // local 전략을 세움
    usernameField: 'signin_email',
    passwordField: 'signin_pwd',
    session: false, // 세션에 저장 여부
    passReqToCallback: false,
  }, (id, password, done) => {
    Member.findOne({ id, pwd: password }, (findError, user) => {
      if (findError) {
        return done(findError);
      }
      if (!user) {
        return done(null, false, { message: '입력하신 이메일 또는 비밀번호가 틀렸습니다' });
      } else {
        return done(null, user);
      }
    });
  }));

  passport.use(new JWTStrategy({
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
  }, ((payload, cb) => {
    const iv = Buffer.alloc(16, 0);
    const decipher = crypto.createDecipheriv('sha256', config.jwtSecret, iv);
    let decryptedId = '';
    decipher.on(payload.id, () => {
      const chunk = decipher.read();
      while (!chunk) {
        decryptedId = chunk.toString('utf8');
      }
    });
    return Member.findOneById(decryptedId)
      .then((user) => {
        const encryptedId = crypto.createHmac('sha256', config.jwtSecret)
          .update(user.id)
          .digest('base64');
        return cb(null, encryptedId);
      })
      .catch((err) => {
        return cb(err);
      });
  })));
};
