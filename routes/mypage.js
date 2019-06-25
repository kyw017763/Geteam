const express = require('express');
const path = require('path');
const router = express.Router(); // 라우터 분리


router.get('/', (req, res) => {
    
    console.log('mypage page');

    res.setHeader('Content-Type', 'text/html');
    res.render(path.join(__dirname, '..', 'views', 'mypage.ejs'));
});

module.exports = router; // 모듈로 만드는 부분