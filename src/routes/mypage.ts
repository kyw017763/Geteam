import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';

const router = express.Router();
export default router;

router.use(flash());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());

router.get('/', (req, res) => {
  console.log('mypage page');

  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'mypage.ejs'));
});
