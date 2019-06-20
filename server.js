const compression = require('compression');
const path = require('path');
const express = require('express');
const app = express();
const route = require('./route.js');

app.use(compression());

app.use((req, res, next) => {
  console.log('Use Module');
  next();
});

app.use(express.static(path.join(__dirname, 'html')));

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