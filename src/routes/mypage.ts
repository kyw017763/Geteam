import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import config from './../config';

const router = express.Router();
export default router;

router.get('/', async (req, res) => {
  const boards = await fetch(`${process.env.API || config.API}/me/boards`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${req.cookies.token}`,
      'Content-Type': 'application/json'
    },
  }).then(res => res.json())
    .then(json => json['data'])
    .catch((err) => []);

  const applies = await fetch(`${process.env.API || config.API}/me/applies`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${req.cookies.token}`,
      'Content-Type': 'application/json'
    },
    }).then(res => res.json())
      .then(json => json['data'])
      .catch((err) => []);

  const info = await fetch(`${process.env.API || config.API}/me/info`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${req.cookies.token}`,
      'Content-Type': 'application/json'
    },
    }).then(res => res.json())
      .then(json => json['data'])
      .catch((err) => []);

  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'mypage.ejs'), {
    boards,
    applies,
    info,
  });
});

router.patch('/info', async (req, res) => {
  const { modifyName, modifySNum, modifyInterest1, modifyInterest2, modifyInterest3, modifyProfile } = req.body;
  await fetch(`${process.env.API || config.API}/me/info`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${req.cookies.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      modifyName, modifySNum, modifyInterest1, modifyInterest2, modifyInterest3, modifyProfile,
    }),
    }).then(async (resResult) => {
      if (resResult.status === 500) {
        const result = await resResult.json();
        req.flash('message', result['data']);
        return res.redirect('/mypage');
      }
      return res.redirect('/signout');
    });
});

router.patch('/pwd', async (req, res) => {
  const { oldPwd, newPwd } = req.body;
  await fetch(`${process.env.API || config.API}/me/pwd`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${req.cookies.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      oldPwd,
      newPwd,
    }),
    }).then(async (resResult) => {
      if (resResult.status === 500) {
        const result = await resResult.json();
        req.flash('message', result['error']);
        return res.redirect('/mypage');
      } else {
        return res.redirect('/signout');
      }
    });
});
