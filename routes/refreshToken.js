import express from 'express';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import config from '../config';

const router = express.Router();
export default router;

router.use(flash());

router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());

router.get('/jwt/refresh', (req, res, next) => {
  passport.authenticate('jwtRefresh', {
    session: false,
  }, (err, user, info) => {
    if (err || !user) {
      res.clearCookie('token');
      res.clearCookie('refreshToken');
      res.redirect('/signin');
    }
    if (user) {
      const newpayload = {
        // eslint-disable-next-line no-underscore-dangle
        _id: user._id,
        name: user.name,
      };

      const newoptions = {
        jwtid: user.id,
        issuer: 'woni',
        expiresIn: config.tokenLife,
      };

      const token = jwt.sign(newpayload, config.jwtSecret, newoptions);
      res.cookie('token', token);
      res.redirect('/');
    }
  })(req, res, next);
});
