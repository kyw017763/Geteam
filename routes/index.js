const express = require('express');
const path = require('path');
const router = express.Router(); // 라우터 분리


router.get('/', (req, res) => {
    
    console.log('index page');

    res.setHeader('Content-Type', 'text/html');
    res.render(path.join(__dirname, '..', 'views', 'index.ejs'));
    res.end();
});

module.exports = router; // 모듈로 만드는 부분