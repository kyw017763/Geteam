import express from 'express';
import path from 'path';
import ejs from 'ejs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';
import redis from 'redis';
import connectRedis from 'connect-redis';
import nodemailer from 'nodemailer';
import fs from 'fs';
import parseJson from 'parse-json';
import methodOverride from 'method-override';
import passport from 'passport';
import passportConfig from './routes/passport';
import auth from './routes/auth';
import board from './routes/board';
import note from './routes/note';
import mypage from './routes/mypage';

const app = express();

const RedisStore = connectRedis(session);
const client = redis.createClient();

app.use(session({
  secret: 'yewon kim',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24000 * 60 * 60, // 쿠키 유효기간 24시간
  },
  store: new RedisStore({ client, logErrors: true }),
}));

app.use(passport.initialize());
app.use(passport.session());
passportConfig();

app.use((req, res, next) => {
  // header에서 사용해야하는 값
  if (req.user) {
    res.locals.sess = true;
  } else {
    res.locals.sess = false;
  }
  res.locals.badge_cal = 0;
  // console.log('전달되진 않는 req.session.userid값 '+req.session.userid);
  // console.log('전달되는 res.locals.sess 값 : '+res.locals.sess);
  // console.log('전달되는 badge_cal 값 : '+res.locals.badge_cal);
  next();
});
// const language = require('@google-cloud/language');

// view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');
app.engine('.ejs', ejs.renderFile);

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'assets')));

// routes 사용
app.use('/', auth);
app.use('/board', passportConfig.authenticate('jwt', { session: false }), board);
app.use('/note', passportConfig.authenticate('jwt', { session: false }), note);
app.use('/mypage', passportConfig.authenticate('jwt', { session: false }), mypage);

app.use((req, res, next) => { // 404 처리 부분
  res.status(404).send('일치하는 주소가 없습니다!');
  res.end();
});
app.use((err, req, res, next) => { // 에러 처리 부분
  console.error(err.stack); // 에러 메시지 표시
  res.status(500).send('서버 에러!'); // 500 상태 표시 후 에러 메시지 전송
  res.end();
});

app.listen(3000, () => {
  console.log('zteam on port 3000!');
}); // 이전과 동일
