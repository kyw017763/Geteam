import express from 'express';
import path from 'path';
import ejs from 'ejs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import fs from 'fs';
import parseJson from 'parse-json';
import connectRedis from 'connect-redis';
import methodOverride from 'method-override';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import passportConfig from './routes/passport';
import auth from './routes/auth';
import board from './routes/board';
import note from './routes/note';
import mypage from './routes/mypage';
import config from './config';
import redisClient from './redis';

const app = express();

const RedisStore = connectRedis(session);

app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 24000 * 60 * 60, // 쿠키 유효기간 24시간
  },
  store: new RedisStore({
    client: redisClient,
    host: '127.0.0.1',
    port: 6379,
    logErrors: true,
  }),
}));

app.use(passport.initialize());
app.use(passport.session());
passportConfig();

// const language = require('@google-cloud/language');

// view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');
app.engine('.ejs', ejs.renderFile);
app.engine('.html', ejs.renderFile);

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'assets')));

app.set('jwt-secret', config.secret);

// TODO: Redis - jwt blacklisting
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type, x-access-token, authorization');

  function jwtVerify() {
    return new Promise((resolve, reject) => {
      if (req.cookies.token) {
        jwt.verify(req.cookies.token, config.jwtSecret, (err, decoded) => {
          redisClient.exists(`jwt-blacklist-${req.cookies.coken}`, ((reply) => {
            if (err) {
              // statusAuth = false
              // 위에거처럼 보내면 안되는데, expired 에러 나거든
              resolve(false);
            } else if (reply === 1) {
              // 블랙리스팅 됐으면 statusAuth = false
              resolve(false);
            } else {
              // token이 있지만 블랙리스팅 되지 않았으면 유일하게 true 값 resolve
              resolve(true);
            }
          }));
        });
      } else {
        // 토큰이 없으면 statusAuth = false
        resolve(false);
      }
    });
  }

  jwtVerify()
    .then((result) => {
      if (result) { // blacklisting 되지 않은 토큰 - 유효한 토큰
        res.redirect('/signin/refresh');
      } else if (req.cookies.token) { // 토큰이 있는데 블랙리스팅 되어 있음
        res.locals.statusAuth = false;
      } else {
        // TODO: 로그인 하면서 res.locals.badgeCal 지정하도록
        res.locals.badgeCal = 0;
        res.locals.statusAuth = true;
        req.decoded = result;
      }
      // refresh해야 하는 토큰은 redirect 해야함
      next();
    });
});

// routes 사용
app.use('/', auth);
app.use('/board', passport.authenticate('jwt', { session: false, failureRedirect: '/signin/refresh' }), board);
app.use('/note', passport.authenticate('jwt', { session: false, failureRedirect: '/signin/refresh' }), note);
app.use('/mypage', passport.authenticate('jwt', { session: false, failureRedirect: '/signin/refresh' }), mypage);

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
