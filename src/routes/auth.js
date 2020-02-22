import express from 'express';
import path from 'path';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import config from '../config';

const router = express.Router();
export default router;

router.use(flash());

router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());

router.get('/', (req, res) => {
  console.log('index page');

  res.setHeader('Content-Type', 'text/html');

  // 접근 권한 없이 board, note, mypage에 접근했을 경우
  res.render(path.join(__dirname, '..', 'views', 'index.ejs'), {
    message: req.flash('message'),

    c: {
      member: 0,
      list: 0,
      apply: 0,
      team: 0,
      visit: 0,
    },
  });
});

// 문의 메일
router.post('/', (req, res) => {
  console.log('question email');

  sendQuestionEmail(req.body.question_kind, req.body.question_title, req.body.question_content);
  res.redirect('/');
});

router.get('/signout', passport.authenticate('jwt', { session: false, failureRedirect: '/signin/refresh' }), (req, res) => {
  redisClient.set(`jwt-blacklist-${req.cookies.token}`, 0);
  redisClient.expire(`jwt-blacklist-${req.cookies.token}`, Number.parseInt(req.decoded.exp - (new Date().getTime() / 1000), 10));
  // res.clearCookie('token');
  // res.clearCookie('refreshToken');
  res.redirect('/');
});

const checkStatusAuth = (req, res, next) => {
  if (res.locals.statusAuth) {
    res.redirect('/');
  } else {
    next();
  }
};

// login, signup, logout
router.get('/signup', checkStatusAuth, (req, res) => {
  console.log('signup page');

  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'signup.ejs'), {
    message: req.flash('message'),
  });
});

router.post('/signup', checkStatusAuth, (req, res) => {
  console.log('signup db connect page');

  try {
    const resultKey = createKey();

    sendAuthEmail(req.body.signup_email, resultKey);

    Member.findOneAndDelete({
      id: req.body.signup_email,
      isVerified: false,
    }, (err, result) => {
      console.log(result);
    });

    Member.createMember(
      req.body.signup_email,
      req.body.signup_name,
      req.body.signup_pwd,
      req.body.signup_num,
      req.body.signup_inter1,
      req.body.signup_inter2,
      req.body.signup_inter3,
      req.body.signup_profile,
      resultKey,
    );
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      console.log('go to signup');
      return res.redirect('/signup');
    }
  }
  return res.redirect('/signup/verify');
});

router.get('/signup/verify', checkStatusAuth, (req, res) => {
  console.log('verify page');

  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'verify.ejs'));
});

router.get('/signup/verify/:key', checkStatusAuth, (req, res) => {
  console.log('verify page');

  Member.findOneAndUpdate({
    verifyKey: req.params.key,
    verifyExpireAt: {
      $gte: new Date(),
    },
    isVerified: false,
  }, {
    $set: {
      isVerified: true,
    },
  }, {
    returnOriginal: true,
  }, (err, member) => {
    if (err || !member) {
      res.setHeader('Content-Type', 'text/html');
      res.render(path.join(__dirname, '..', 'views', 'verifyError.ejs'));
    } else {
      res.setHeader('Content-Type', 'text/html');
      res.render(path.join(__dirname, '..', 'views', 'verifyClear.ejs'));
    }
  });
});

router.get('/signup/verify/new/:key', checkStatusAuth, (req, res) => {
  console.log('verify new page');

  const resultKey = createKey();

  Member.findOneAndUpdate({
    id: req.query.email,
    verifyKey: req.params.key,
    isVerified: false,
  }, {
    $set: {
      verifyKey: resultKey,
    },
  }, {
    returnOriginal: true,
  }, (err, member) => {
    if (err || !member) {
      res.setHeader('Content-Type', 'text/html');
      res.render(path.join(__dirname, '..', 'views', 'verifyError.ejs'));
    } else {
      sendAuthEmail(req.query.email, resultKey);
      res.setHeader('Content-Type', 'text/html');
      res.render(path.join(__dirname, '..', 'views', 'verify.ejs'));
    }
  });
});

router.post('/signup/compareEmail', checkStatusAuth, (req, res) => {
  Member.findOne({ id: req.body.id, isVerified: true }, (err, result) => {
    if (err) {
      return res.status(500).end();
    }
    if (!result) {
      return res.status(200).json(JSON.stringify({ result: true })).send();
    } else {
      return res.status(200).json(JSON.stringify({ result: false })).send();
    }
  });
});

router.get('/signin', checkStatusAuth, (req, res) => {
  console.log('signin page');

  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'signin.ejs'), {
    message: req.flash('message'),
    cookieEmail: req.cookies.cookieEmail || null,
  });
});

router.post('/signin', checkStatusAuth, (req, res) => {
  const id = req.body.signin_email;
  const pwd = req.body.signin_pwd;
  Member.findOne({ id, pwd, isVerified: true }, (err, member) => {
    if (err) {
      req.flash('message', '오류가 발생했습니다');
      res.redirect('/signin');
    } else if (!member) {
      req.flash('message', '해당 이메일 또는 비밀번호가 틀렸습니다');
      res.redirect('/signin');
    } else {
      const payload = {
        // eslint-disable-next-line no-underscore-dangle
        _id: member._id,
        name: member.name,
      };

      const options = {
        jwtid: member.id,
        issuer: 'woni',
        expiresIn: config.tokenLife,
      };

      const refreshOptions = {
        jwtid: member.id,
        issuer: 'woni',
        expiresIn: config.refreshTokenLife,
      };

      const token = jwt.sign(payload, config.jwtSecret, options);
      const refreshToken = jwt.sign(payload, config.refreshTokenSecret, refreshOptions);

      if (req.body.emailCookie === 'yes') {
        res.cookie('cookieEmail', req.body.signin_email);
      }
      res.cookie('token', token);
      res.cookie('refreshToken', refreshToken);
      res.redirect('/');
    }
  });
});

router.post('/signin/find', checkStatusAuth, (req, res) => {
  console.log('find pwd page');

  try {
    console.log(req.body.find_email);
    Member.findOne({ id: req.body.find_email }).exec((err, idCheckUser) => { // 아이디만 가져와서 맞음 or 틀림
      // eslint-disable-next-line max-len
      if (idCheckUser && (req.body.find_hint === idCheckUser.interest1 || req.body.find_hint === idCheckUser.interest2 || req.body.find_hint === idCheckUser.interest3)) {
        sendPwdEmail('Geteam 비밀번호 찾기', idCheckUser.id, idCheckUser.pwd);
      }
    });
  } catch (e) {
    console.log(e);
    return res.redirect('/');
  }

  return res.redirect('/signin');
});
