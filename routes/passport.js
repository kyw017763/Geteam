import passport from 'passport';
import * as passportLocal from 'passport-local';
import * as passportJWT from 'passport-jwt';
import config from '../config';
import Member from '../models/member';

const JWTStrategy = passportJWT.Strategy;
const extractJWT = passportJWT.ExtractJwt;

export default () => {
  passport.serializeUser((member, done) => { // Strategy 성공 시 호출됨
    const user = {
      id: member.id,
      pwd: member.pwd,
    };
    done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  });

  passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    done(null, user); // 여기의 user가 req.user가 됨
  });

  passport.use(new passportLocal.LocalStrategy({ // local 전략을 세움
    usernameField: 'signin_email',
    passwordField: 'signin_pwd',
    session: true, // 세션에 저장 여부
    passReqToCallback: false,
  }, (id, password, done) => {
    Member.findOne({ id }, (findError, user) => {
      console.log('finding id');
      console.log(user);
      if (findError) return done(findError); // 서버 에러 처리
      if (!user) {
        // req.session.message = '해당 이메일로 가입된 계정이 없습니다';
        return done(null, false, { message: '해당 이메일로 가입된 계정이 없습니다' }); // 임의 에러 처리
      }

      return user.comparePassword(password, user.pwd, (passError, isMatch) => {
        console.log(isMatch);
        console.log('finding pwd');
        if (isMatch) {
          return done(null, user); // 검증 성공
        }
        // req.session.message = '해당 이메일 또는 비밀번호가 틀렸습니다';
        return done(null, false, { message: '해당 이메일 또는 비밀번호가 틀렸습니다' }); // 임의 에러 처리
      });
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
