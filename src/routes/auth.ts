import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import config from './../config';

import { checkStatusAuth, checkNotStatusAuth } from './../middleware';

const router = express.Router();
export default router;

router.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'text/html');

  const counting = await fetch(`${process.env.API || config.API}/counting`)
    .then(res => res.json())
    .then(json => json.data)
    .catch((err) => {
      console.log(err);
    }) || { visit: 0, account: 0, list: 0, apply: 0, team: 0 };
    
  res.render(path.join(__dirname, '..', 'views', 'index.ejs'), {
    counting,
  });
});

router.get('/signup', checkNotStatusAuth, (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'signup.ejs'));
});

router.post('/signup', checkNotStatusAuth, async (req, res) => {
  const registerResult = await fetch(`${process.env.API || config.API}/register`, {
    method: 'POST',
    body: JSON.stringify(req.body),
    headers:{
    'Content-Type': 'application/json'
    },
  }).then(res => res.json())
    .then(json => json.success);

  if (registerResult) {
    return res.redirect('/signup/verify');
  } else {
    return res.redirect(req.originalUrl);
  }
});

router.get('/signup/verify', checkNotStatusAuth, (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'verify.ejs'));
});

router.get('/signup/verify/:key', checkNotStatusAuth, async (req, res) => {
  const verifyEmailResult = await fetch(`${process.env.API || config.API}/register/verify/${req.params.key}`, {
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

router.get('/signup/verify/new/:key', checkNotStatusAuth, async (req, res) => {
  const verifyEmailNewResult = await fetch(`${process.env.API || config.API}/register/verify/new/${req.params.key}`, {
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

router.get('/signin', checkNotStatusAuth, (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'signin.ejs'), {
    cookieEmail: req.cookies.cookieEmail || null,
  });
});

router.post('/signin', checkNotStatusAuth, async (req, res) => {
  const signinResult = await fetch(`${process.env.API || config.API}/signin`, {
    method: 'POST',
    body: JSON.stringify(req.body),
    headers:{
    'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(json => json);

  if (signinResult.success) {
    res.cookie('token', signinResult.data.accessToken);
    res.cookie('exp', signinResult.data.exp);

    if (req.body.email === 'yes') {
      res.cookie('cookieEmail', req.body.signin_email);
    }

    return res.redirect('/');
  } else {
    return res.redirect(req.originalUrl);
  }
});

router.patch('/signin/reset', checkNotStatusAuth, async (req, res) => {
  const signinResetResult = await fetch(`${process.env.API || config.API}/signin/reset`, {
    method: 'PATCH',
    body: JSON.stringify(req.body),
    headers:{
    'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(json => json.success);
  
  if (signinResetResult) {
    return res.redirect('/signin');
  } else {
    return res.redirect('/signin');
  }
});

router.get('/signout', checkStatusAuth, async (req, res) => {
  const signoutResult = await fetch(`${process.env.API || config.API}/signout`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${req.cookies.token}`,
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
  const signinResetResult = await fetch(`${process.env.API || config.API}/unregister`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${req.cookies.token}`,
    }
  }).then(res => res.json())
    .then(json => json.success);
  
  if (signinResetResult) {
    res.clearCookie('token');
    res.clearCookie('exp');
    return res.redirect('/');
  } else {
    return res.redirect('/');
  }
});
