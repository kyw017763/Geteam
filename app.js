import express from 'express';
import path from 'path';
import ejs from 'ejs';
import dotenv from 'dotenv';
import config from 'config';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectRedis from 'connect-redis';
import methodOverride from 'method-override';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import passportConfig from './routes/passport';

import refreshToken from './routes/refreshToken';
import auth from './src/routes/auth';
import board from './src/routes/board';
import note from './src/routes/note';
import mypage from './src/routes/mypage';

dotenv();

const app = express();

const RedisStore = connectRedis(session);

app.use(session({
  secret: config.SESSION_SECRET,
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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('.ejs', ejs.renderFile);
app.engine('.html', ejs.renderFile);

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'assets')));

app.set('jwt-secret', config.SECRET);

const authMiddleware = (req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
  // res.header('Access-Control-Allow-Headers', 'content-type, x-access-token, authorization');

  if (req.cookies.token) {
    jwt.verify(req.cookies.token, config.JWT_SECRET, (err, decoded) => {
      if (err) { // expired된 token - 이쪽에서 '리디렉션한 횟수가 너무 많습니다.'
        console.log('can publish access token');
        return res.redirect('/jwt/refresh');
      } else { // 유효한 token
        redisClient.exists(`jwt-blacklist-${req.cookies.token}`, ((redisErr, reply) => {
          if (reply === 1) { // 블랙리스팅 된 token
            console.log('It\'s blacklist token');
            res.locals.statusAuth = false;
          } else { // 블랙리스팅 되지 않은 token
            // TODO: 로그인 하면서 res.locals.badgeCal 지정하도록
            console.log('normal auth');
            res.locals.badgeCal = 0;
            res.locals.statusAuth = true;
            req.decoded = decoded;
          }
          next();
        }));
      }
    });
  } else { // token 없음
    res.locals.statusAuth = false;
    next();
  }
};

app.use('/', refreshToken);
app.use('/', authMiddleware, auth);
app.use('/board', authMiddleware, passport.authenticate('jwt', { session: false, failureRedirect: '/' }), board);
app.use('/note', authMiddleware, passport.authenticate('jwt', { session: false, failureRedirect: '/' }), note);
app.use('/mypage', authMiddleware, passport.authenticate('jwt', { session: false, failureRedirect: '/' }), mypage);

app.listen(config.PORT, () => {
  console.log(`Geteam on ${PORT}`);
});
