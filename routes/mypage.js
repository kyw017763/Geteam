const express = require('express');
const path = require('path');
const router = express.Router(); // 라우터 분리

const ejs = require('ejs');

const app = express();
//view engine setup
app.set('views','../views');
app.set('view engine','ejs');
app.engine('.ejs', ejs.renderFile);

// 없으면 경로 안맞음
router.use(express.static(__dirname));


router.get('/', (req, res) => {
    console.log('mypage page');
    res.sendFile(path.join(__dirname, '..', 'views', 'mypage.ejs'));
});

module.exports = router; // 모듈로 만드는 부분