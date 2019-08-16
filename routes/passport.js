const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Member = require('../models/member.js');

module.exports = () => {
    passport.serializeUser((Member, done) => { // Strategy 성공 시 호출됨
        done(null, Member.id, Member.pwd); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
    });

    passport.deserializeUser((Member, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
        done(null, Member); // 여기의 user가 req.user가 됨
    });

    passport.use(new LocalStrategy({ // local 전략을 세움
        usernameField: 'signin_email',
        passwordField: 'signin_pwd',
        session: true, // 세션에 저장 여부
        passReqToCallback: false,
    }, (id, password, done) => {
        Member.findOne({ id: id }, (findError, user) => {
            console.log('finding id');
            console.log(user);
            if (findError) return done(findError); // 서버 에러 처리
            if (!user) {
                //req.session.message = '해당 이메일로 가입된 계정이 없습니다';
                return done(null, false, { message: '해당 이메일로 가입된 계정이 없습니다' }); // 임의 에러 처리
            }
            
            return user.comparePassword(password, user.pwd, (passError, isMatch) => {
                console.log(isMatch);
                console.log('finding pwd');
                if (isMatch) {
                req.sessioin.userid = id;
                req.session.username = password;
                return done(null, user); // 검증 성공
                }
                //req.session.message = '해당 이메일 또는 비밀번호가 틀렸습니다';
                return done(null, false, { message: '해당 이메일 또는 비밀번호가 틀렸습니다' }); // 임의 에러 처리
            });
        });
    }));
};