const express = require('express');
const path = require('path');
const router = express.Router(); // 라우터 분리


router.get('/', (req, res) => {
    console.log('It\'s board page');
});

// study
router.get('/board/study/list', (req, res) => {
    console.log('study_list page');
    res.setHeader('Content-Type', 'text/html');
    res.render(path.join(__dirname, '..', 'views', 'study_list.ejs'));
    // ?kind=',req.query.kind,'&big=',req.query.big
});

router.get('/board/study/view', (req, res) => {
    console.log('study_view page');
    res.setHeader('Content-Type', 'text/html');
    res.render(path.join(__dirname, '..', 'views', 'study_view.ejs'));
    // ?num=',req.query.num,'&page=',page,'&kind=',req.query.kind,'&big=',req.query.big
});

router.get('/board/study/write', (req, res) => {
    console.log('study_insert');
    
});

router.get('/board/study/modify', (req, res) => {
    console.log('study_modify');
    
});


router.get('/board/study/delete', (req, res) => {
    console.log('study_delete');
    
});


// contest
router.get('/board/contest/list', (req, res) => {
    console.log('contest_list page');
    res.render(path.join(__dirname, '..', 'views', 'contest_list.ejs'));
});

router.get('/board/contest/view', (req, res) => {
    console.log('contest_view page');
    res.render(path.join(__dirname, '..', 'views', 'contest_view.ejs'));
});

router.get('/board/contest/write', (req, res) => {
    console.log('contest_insert');
    
});

router.get('/board/contest/modify', (req, res) => {
    console.log('contest_modify');
    
});


router.get('/board/contest/delete', (req, res) => {
    console.log('contest_delete');
    
});

module.exports = router; // 모듈로 만드는 부분