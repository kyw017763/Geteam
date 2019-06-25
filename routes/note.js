const express = require('express');
const path = require('path');
const router = express.Router(); // 라우터 분리


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

router.get('/insert', (req, res) => {
    console.log('note_insert');
    
});

router.get('/delete', (req, res) => {
    console.log('note_delete');
    
});

module.exports = router; // 모듈로 만드는 부분