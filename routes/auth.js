import express from 'express';
import path from 'path';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import Member from '../models/member';
import config from '../config';

const router = express.Router();
export default router;

router.use(flash());

router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());

function createKey() {
  const firstKey = crypto.randomBytes(256).toString('hex').substr(100, 5);
  const secondKey = crypto.randomBytes(256).toString('base64').substr(50, 5);
  return firstKey + secondKey;
}

function sendPwdEmail(subject, dest, userId, userPwd) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: config.email,
      pass: config.pwd,
    },
  });

  const mailOptions = {
    from: config.email,
    to: dest,
    subject: subject,
    html: `<h1>비밀번호 찾기</h1> ${userId}님의 임시 비밀번호는 <span style="background: #efdc05;">${userPwd}</span> 입니다.`,
  };

  transporter.sendMail(mailOptions, (errIn, info) => {
    if (errIn) {
      console.log(errIn);
    } else {
      console.log(`Message sent : ${info.response}`);
    }
    transporter.close();
  });
}

function sendQuestionEmail(kind, title, content) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: config.email,
      pass: config.pwd,
    },
  });

  let message = content;
  message = message.replace(/(?:\r\n|\r|\n)/g, '<br />');
  const mailOptions = {
    from: config.email,
    to: config.email,
    subject: `Geteam 문의사항 : ${title}`,
    html: `<h3>[${kind}] ${title}</h3> ${message}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Message sent : ${info.response}`);
    }
    transporter.close();
  });
}

function sendAuthEmail(userEmail, key) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: config.email,
      pass: config.pwd,
    },
  });
  const mailOptions = {
    from: config.email,
    to: userEmail,
    subject: 'Geteam 이메일 인증',
    html: `<h3>Geteam 이메일 인증용 링크</h3>
    Geteam 계정에 등록하신 이메일 주소(${userEmail})가 올바른지 확인하기 위한 인증 링크입니다.
    이 <a href="http://127.0.0.1:3000/signup/verify/${key}" style="color: #efdc05;">인증 링크</a>를 클릭하여 이메일 인증을 완료해 주세요!
    <br>
    개인정보 보호를 위해 인증 링크는 하루동안만 유효합니다.
    <br>
    만약 인증 메일의 재발송을 원하신다면 <a href="http://127.0.0.1:3000/signup/verify/new/${key}?email=${userEmail}" style="color: #efdc05;">이 링크</a>를 클릭해주세요!
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Message sent : ${info.response}`);
    }
    transporter.close();
  });
}

router.get('/', (req, res) => {
  console.log('index page');

  console.log(req.decoded || null);
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

router.use('/sign*', (req, res, next) => {
  if (req.user) {
    res.redirect('/');
  } else {
    next();
  }
});

// login, signup, logout
router.get('/signup', (req, res) => {
  console.log('signup page');

  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'signup.ejs'), {
    message: req.flash('message'),
  });
});

router.post('/signup', (req, res) => {
  console.log('signup db connect page');

  try {
    const resultKey = createKey();

    sendAuthEmail(req.body.signup_email, resultKey);

    Member.findOneAndDelete({
      id: req.body.signup_email,
      isVerified: false,
    }, (err, rr) => {
      console.log(rr);
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

router.get('/signup/verify', (req, res) => {
  console.log('verify page');

  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'verify.ejs'));
});

router.get('/signup/verify/:key', (req, res) => {
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

router.get('/signup/verify/new/:key', (req, res) => {
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

router.post('/signup/compareEmail', (req, res) => {
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

router.get('/signin', (req, res) => {
  console.log('signin page');

  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'signin.ejs'), {
    message: req.flash('message'),
    cookieEmail: req.cookies.cookieEmail || null,
  });
});

router.post('/signin', (req, res) => {
  const id = req.body.signin_email;
  const pwd = req.body.signin_pwd;
  Member.findOne({ id, pwd, isVerified: true }, (err, member) => {
    if (err) {
      req.flash('message', '오류가 발생했습니다');
      res.redirect('/signin');
    } else {
      const payload = {
        // eslint-disable-next-line no-underscore-dangle
        _id: member._id,
        id: member.id,
        name: member.name,
      };

      const options = {
        issuer: 'woni',
        expiresIn: 60 * 60 * 24,
      };

      jwt.sign(payload, config.jwtSecret, options, (errJwt, token) => {
        if (errJwt) {
          req.flash('message', '오류가 발생했습니다');
          res.redirect('/signin');
        } else {
          if (req.body.emailCookie === 'yes') {
            res.cookie('cookieEmail', req.body.signin_email);
          }
          res.cookie('token', token);
          res.redirect('/');
        }
      });
    }
  });
});

router.post('/signin/find', (req, res) => {
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

router.get('/signout', passport.authenticate('jwt', { session: false }), (req, res) => {
  // TODO: Redis - jwt
  res.clearCookie('token');
  res.redirect('/');
});
