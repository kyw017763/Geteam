import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Member from '../models/member';

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

  passport.use(new LocalStrategy({ // local 전략을 세움
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
};
