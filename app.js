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
// const language = require('@google-cloud/language');

//templete engine and path
ejs.open = '<?';
ejs.close = '?>';

app.set('view engine', 'ejs');
app.engine('.html', ejs.renderFile);
app.set('views', './views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(session({
	secret:'123123123',
	resave:false,
	saveUninitialize:true
}));

//sha 256 비밀번호 암호화
var sha256 = require('sha256');

const route = require('./route.js');

app.use((req, res, next) => {
  console.log('Use Module');
  next();
});

app.use(express.static(__dirname));
app.use(passport.initialize());
app.use(passport.session());

// 위에서 path.join을 해주었으므로 .use 만 사용하면 됨
app.use(route);

app.use((req, res, next) => { // 404 처리 부분
  res.status(404).send('일치하는 주소가 없습니다!');
});
app.use((err, req, res, next) => { // 에러 처리 부분
  console.error(err.stack); // 에러 메시지 표시
  res.status(500).send('서버 에러!'); // 500 상태 표시 후 에러 메시지 전송
});

app.listen(3000, () => {
  console.log('zteam on port 3000!');
}); // 이전과 동일