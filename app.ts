import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import ejs from 'ejs';
import dotenv from 'dotenv';
import config from './src/config';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import methodOverride from 'method-override';

import auth from './src/routes/auth';
import board from './src/routes/board';
import note from './src/routes/note';
import mypage from './src/routes/mypage';
import checkStatusAuth from './src/middleware/checkStatusAuth';

import connectRedis from 'connect-redis';
import redisClient from './redis';

dotenv.config();

const app = express();
const RedisStore = connectRedis(session);
app.use(session({
  secret: process.env.SESSION_SECRET || config.SESSION_SECRET,
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

const authMiddleware = async (req: any, res: any, next: any) => {
  try {
    const token = req.cookies.token || null;

    if (token) {
      // TODO: refresh token 하는 부분이 껴야 한다
      const tokenVerifyResult = await fetch('http://localhost:3000/verify', {
        method: 'POST',
        headers: {
          'Authorization': token,
        }
      }).then(res => res.json())
        .then(json => json)
        .catch((err) => { throw new Error(err)});
  
      if (tokenVerifyResult.success) {
        // TODO: 로그인 하면서 res.locals.badgeCal 지정하도록
        res.locals.badgeCal = 0;
        res.locals.statusAuth = true;
        req.decoded = tokenVerifyResult.data;
      } else {
        throw new Error();
      }

    } else { // jwt vetify, blacklisting, db 시 token에 문제가 있다면
      res.locals.statusAuth = false;
    }
  } catch (err) {
    res.locals.statusAuth = false;
  }
  
  next();
};

app.use('/', authMiddleware, auth);
app.use('/board', authMiddleware, checkStatusAuth, board);
app.use('/note', authMiddleware, checkStatusAuth, note);
app.use('/mypage', authMiddleware, checkStatusAuth, mypage);

app.listen(process.env.PORT || config.PORT, () => {
  console.log(`Geteam on ${process.env.PORT || config.PORT}`);
});
