const express = require('express');
const app = express();
const path = require('path');
// const sequelize = require('sequelize'); // ORM 사용시
const parseJson = require('parse-json');
const fs = require('fs');
// const spawn = require('child_process').spawn; // 자식모듈
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const fb = require(./function/fbLogin'); // facebook login
const passport = require('passport')
const ejs = require('ejs');

app.use(session({
    secret: 'yewon kim',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
    }
}))
// const language = require('@google-cloud/language');

//view engine setup
app.set('views','./views');
app.set('view engine','ejs');
app.engine('.ejs', ejs.renderFile);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'assets')));

//sha 256 비밀번호 암호화
const sha256 = require('sha256');

app.use(passport.initialize());
app.use(passport.session());

var auth = require('./routes/auth.js');
var board = require('./routes/board.js');
var note = require('./routes/note.js');
var mypage = require('./routes/mypage.js');

// routes 사용
app.use('/', auth);
app.use('/board', board);
app.use('/note', note);
app.use('/mypage', mypage);

app.use((req, res, next) => { // 404 처리 부분
  res.status(404).send('일치하는 주소가 없습니다!');
  res.end();
});
app.use((err, req, res, next) => { // 에러 처리 부분
  console.error(err.stack); // 에러 메시지 표시
  res.status(500).send('서버 에러!'); // 500 상태 표시 후 에러 메시지 전송
  res.end();
});

app.listen(3000, () => {
  console.log('zteam on port 3000!');
}); // 이전과 동일