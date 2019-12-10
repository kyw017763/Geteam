import express from 'express';
import path from 'path';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import nodemailer from 'nodemailer';
import passportConfig from './passport';
import Member from '../models/member';
import Counting from '../models/counting';
import authorization from '../middleware/authorization';

const router = express.Router();
export default router;

router.use(flash());

router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());

router.get('/', (req, res) => {
  console.log('index page');

  Counting.find({}, (err, counting) => {
    console.log(`returned document : ${counting.length}`);
    if (counting.length === 0) Counting.create({});
  });

  Counting.findOneAndUpdate({}, { $inc: { visit: 1 } });

  res.setHeader('Content-Type', 'text/html');
  console.log(`signin : ${req.session.userid}`);

  // 접근 권한 없이 board, note, mypage에 접근했을 경우

  Counting.findOne({}, (err, counting) => {
    console.log(counting);
    if (!counting) {
      // eslint-disable-next-line no-param-reassign
      counting = {
        member: 0,
        list: 0,
        apply: 0,
        team: 0,
        visit: 0,
      };
    }

    res.render(path.join(__dirname, '..', 'views', 'index.ejs'), {
      message: req.flash('message'),
      c: counting,
    });
  });
  // res.end();
});

// 문의 메일
router.post('/', (req, res) => {
  console.log('question email');

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 's2017s04@e-mirim.hs.kr',
      pass: '',
    },
  });

  const message = req.body.question_content;
  const mResult = message.replace(/(?:\r\n|\r|\n)/g, '<br />');
  const mailOptions = {
    from: 's2017s04@e-mirim.hs.kr',
    to: req.body.question_recv,
    subject: `[ZTEAM question]${message.substring(0, 10)}`,
    html: `<h1>문의사항</h1>${mResult}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Message sent : ${info.response}`);
    }
    transporter.close();
  });

  res.redirect('/');
});

// login, signup, logout
router.get('/signup', (req, res) => {
  console.log('signup page');

  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'signup.ejs'), {
    message: req.flash('message'),
  });

  res.end();
});

router.post('/signup', (req, res) => {
  console.log('signup db connect page');

  let str;
  let flag;

  const regxEmail = /[A-Za-z0-9]{8}@e-mirim.hs.kr/;
  const regxPwd = /(?=.*\d{1,50})(?=.*[~`!@#$%^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,15}$/;
  const resultEmail = regxEmail.exec(req.body.signup_email);
  const resultPwd = regxPwd.exec(req.body.signup_pwd);

  if (!resultEmail) {
    str = '학교 이메일 형식은 @e-mirim.hs.kr 입니다';
    flag = 1;
  } else if (!resultPwd) {
    str = '비밀번호 형식이 틀립니다';
    flag = 1;
  }
  if (flag === 1) {
    req.flash('message', str);
    return res.redirect('/signup');
  }

  Member.create({
    id: req.body.signup_email,
    name: req.body.signup_name,
    pwd: req.body.signup_pwd,
    s_num: req.body.signup_num,
    interest1: req.body.signup_inter1,
    interest2: req.body.signup_inter2,
    interest3: req.body.signup_inter3,
    profile: req.body.signup_profile,
  }, (err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        console.log('go to signup');
        str = '중복된 이메일로 가입하실 수 없습니다!';
        req.flash('message', str);
        return res.redirect('/signup');
      }
    }

    Counting.updateMember();
    console.log('go to signin');
    return res.redirect('/signin');
  });
});

router.post('/signup/compareEmail', (req, res) => {
  Member.findOne({ id: req.body.id }, (err, result) => {
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
  res.end();
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

  function sendEmail(pwd) {
    const transporter = sendEmail(pwd);

    const message = `${req.body.find_email}님의 비밀번호는 <span style="background: #efdc05;">${pwd}</span> 입니다.`;
    const mailOptions = {
      from: 's2017s04@e-mirim.hs.kr',
      to: req.body.find_email,
      subject: '[ZTEAM 비밀번호 찾기]',
      html: `<h1>비밀번호 찾기</h1>${message}`,
    };

    transporter.sendMail(mailOptions, (errIn, info) => {
      if (errIn) {
        console.log(errIn);
      } else {
        console.log(`Message sent : ${info.response}`);
      }
      transporter.close();
    });

    return nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 's2017s04@e-mirim.hs.kr',
        pass: 'LimKimwon7763*',
      },
    });
  }

  try {
    console.log(req.body.find_email);
    Member.findOne({ id: req.body.find_email }).exec((err, idCheckUser) => { // 아이디만 가져와서 맞음 or 틀림
      // eslint-disable-next-line max-len
      if (idCheckUser && req.body.find_hint === idCheckUser.interest1 && req.body.find_hint === idCheckUser.interest2 && req.body.find_hint === idCheckUser.interest3) {
        sendEmail(idCheckUser.pwd);
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
