import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';

import checkStatusAuth from './../middleware/checkStatusAuth';

const router = express.Router();
export default router;

router.use(flash());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());

router.get('/', async (req, res) => {
  console.log('index page');

  res.setHeader('Content-Type', 'text/html');

  const counting = await fetch('http://localhost:3000/counting')
    .then(res => res.json())
    .then(json => json.data);

  // 접근 권한 없이 board, note, mypage에 접근했을 경우 index 페이지로
  res.render(path.join(__dirname, '..', 'views', 'index.ejs'), {
    message: req.flash('message'),
    counting,
  });
});

// 문의 메일
// router.post('/', (req, res) => {
//   console.log('question email');

//   sendQuestionEmail(req.body.question_kind, req.body.question_title, req.body.question_content);
//   res.redirect('/');
// });

router.get('/signup', checkStatusAuth, (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'signup.ejs'), {
    message: req.flash('message'),
  });
});

router.post('/signup', checkStatusAuth, async (req, res) => {
  const registerResult = await fetch('http://localhost:3000/register', {
    method: 'POST',
    body: req.body
  }).then(res => res.json())
    .then(json => json.success);

  if (registerResult) {
    return res.redirect('/signup/verify');
  } else {
    return res.redirect('/signup');
  }
});

router.get('/signup/verify', checkStatusAuth, (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'verify.ejs'));
});

router.get('/signup/verify/:key', checkStatusAuth, async (req, res) => {
  const verifyEmailResult = await fetch('http://localhost:3000/signup/verify/'+req.params.key, {
    method: 'POST',
  }).then(res => res.json())
    .then(json => json.success);

  if (verifyEmailResult) {
    res.setHeader('Content-Type', 'text/html');
    res.render(path.join(__dirname, '..', 'views', 'verifyClear.ejs'));
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.render(path.join(__dirname, '..', 'views', 'verifyError.ejs'));
  }
});

router.get('/signup/verify/new/:key', checkStatusAuth, async (req, res) => {
  const verifyEmailNewResult = await fetch('http://localhost:3000/signup/verify/new/'+req.params.key, {
    method: 'POST',
  }).then(res => res.json())
    .then(json => json.success);
  
  if (verifyEmailNewResult) {
    res.setHeader('Content-Type', 'text/html');
    res.render(path.join(__dirname, '..', 'views', 'verify.ejs'));
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.render(path.join(__dirname, '..', 'views', 'verifyError.ejs'));
  }
});

router.get('/signin', checkStatusAuth, (req, res) => {
  console.log('signin page');

  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'signin.ejs'), {
    message: req.flash('message'),
    cookieEmail: req.cookies.cookieEmail || null,
  });
});

router.post('/signin', checkStatusAuth, async (req, res) => {
  const signinResult = await fetch('http://localhost:3000/signin', {
    method: 'POST',
    body: req.body
  }).then(res => res.json())
    .then(json => json);

  if (signinResult.success) {
    res.cookie('token', signinResult.data.accessToken);
    res.cookie('exp', signinResult.data.exp);
  }

  if (req.body.emailCookie === 'yes') {
    res.cookie('cookieEmail', req.body.signin_email);
  }
  res.redirect('/');
});

router.patch('/signin/reset', checkStatusAuth, async (req, res) => {
  const signinResetResult = await fetch('http://localhost:3000/signin/reset', {
    method: 'PATCH',
    body: req.body
  }).then(res => res.json())
    .then(json => json.success);
  
  if (signinResetResult) {
    return res.redirect('/signin');
  } else {
    return res.redirect('/');
  }
});

router.post('/signout', checkStatusAuth, async (req, res) => {
  const signoutResult = await fetch('http://localhost:3000/signout', {
    method: 'POST',
    headers: {
      Authorization: req.cookies.token,
    }
  }).then(res => res.json())
    .then(json => json.success);

  if (signoutResult) {
    res.clearCookie('token');
    res.clearCookie('exp');
  }

  res.redirect('/');
});

router.delete('/unregister', checkStatusAuth, async (req, res) => {
  const signinResetResult = await fetch('http://localhost:3000/signin/unregister', {
    method: 'POST',
    body: req.body,
    headers: {
      Authorization: req.cookies.token,
    }
  }).then(res => res.json())
    .then(json => json.success);
  
  if (signinResetResult) {
    res.clearCookie('token');
    res.clearCookie('exp');
    return res.redirect('/signin');
  } else {
    return res.redirect('/');
  }
});
