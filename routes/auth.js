import express from 'express';
import path from 'path';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import passportConfig from './passport';
import Member from '../models/member';
import authorization from '../middleware/authorization';
import config from '../config';

const router = express.Router();
export default router;

router.use(flash());

router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());

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
    아래의 인증 링크를 클릭하여 이메일 인증을 완료해 주세요.
    <div>인증 링크: <a href="http://127.0.0.1:3000/signup/verify/${key}" style="color: #efdc05;">http://127.0.0.1:3000/signup/verify/${key}</a></div>
    개인정보 보호를 위해 인증 링크는 하루동안만 유효합니다!
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
    const firstKey = crypto.randomBytes(256).toString('hex').substr(100, 5);
    const secondKey = crypto.randomBytes(256).toString('base64').substr(50, 5);
    const resultKey = firstKey + secondKey;

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

  Member.updateOne({
    verifyKey: req.params.key,
    verifyExpireAt: {
      $lte: new Date(),
    },
  }, {
    $set: {
      email_verified: true,
    },
  }, (err, member) => {
    if (err) {
      console.log(err);
    } else if (!member) {
      res.redirect('/');
    } else {
      res.setHeader('Content-Type', 'text/html');
      res.render(path.join(__dirname, '..', 'views', 'verifyClear.ejs'));
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

  let cid = null;
  if (req.cookies.cookie_id !== undefined) {
    cid = req.cookies.cookie_id;
    console.log(`cookie_id : ${cid}`);
  }

  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'signin.ejs'), {
    message: req.flash('message'),
    cookie_id: cid,
  });
});

router.post('/signin', (req, res, next) => {
  passportConfig.authenticate('local', { session: false }, (errOut, userId) => {
    if (errOut) {
      return next(errOut);
    }
    if (!userId) {
      // checkbox 체크 시 쿠키
      if (req.body.id_ck === 'yes') {
        res.cookie('cookie_id', req.body.signin_email);
      }

      const str = '해당 이메일 또는 비밀번호가 틀렸습니다';
      req.flash('message', str);

      return res.redirect('/signin');
    } else {
      return res.redirect('/');
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

router.get('/signout', authorization, (req, res) => {
  // TODO: signout
  res.redirect('/');
});
