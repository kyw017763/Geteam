import express from 'express';
import path from 'path';
import ejs from 'ejs';
import dotenv from 'dotenv';
import config from './config';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';
import connectRedis from 'connect-redis';
import redisClient from './redisClient';
import methodOverride from 'method-override';

import { auth, board, apply, note, mypage } from './routes';
import { checkStatusAuth, setStatusAuth } from './middleware';

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
    client: redisClient.client,
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
app.use(flash());
app.use(express.static(path.resolve(__dirname, 'assets')));

app.use('/', setStatusAuth, auth);
app.use('/board', setStatusAuth, checkStatusAuth, board);
app.use('/apply', setStatusAuth, checkStatusAuth, apply);
app.use('/note', setStatusAuth, checkStatusAuth, note);
app.use('/mypage', setStatusAuth, checkStatusAuth, mypage);

app.listen(process.env.PORT || config.PORT, () => {
  console.log(`Geteam on ${process.env.PORT || config.PORT}`);
});
