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

// note
router.get('/send', (req, res) => {
  console.log('note_send page');
  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'note_send.ejs'));
});

router.get('/recv', (req, res) => {
  console.log('note_recv page');
  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'note_recv.ejs'));
});

router.post('/insert', (req, res) => {
  console.log('note_insert');
});

router.delete('/delete', (req, res) => {
  console.log('note_delete');
});
