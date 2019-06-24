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


// note
router.get('/send', (req, res) => {
    console.log('note_send page');
    res.render(path.join(__dirname, '..', 'views', 'note_send.ejs'));
});

router.get('/recv', (req, res) => {
    console.log('note_recv page');
    res.render(path.join(__dirname, '..', 'views', 'note_recv.ejs'));
});

router.get('/insert', (req, res) => {
    console.log('note_insert');
    
});

router.get('/delete', (req, res) => {
    console.log('note_delete');
    
});

module.exports = router; // 모듈로 만드는 부분