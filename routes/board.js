const express = require('express');
const path = require('path');
const router = express.Router(); // 라우터 분리


router.get('/', (req, res) => {
    console.log('It\'s board page');
});

// study
router.get('/study/list', (req, res) => {
    console.log('study_list page');
    res.setHeader('Content-Type', 'text/html');
    res.render(path.join(__dirname, '..', 'views', 'study_list.ejs'));
    // ?kind=',req.query.kind,'&big=',req.query.big
});

router.get('/study/view', (req, res) => {
    console.log('study_view page');
    res.setHeader('Content-Type', 'text/html');
    res.render(path.join(__dirname, '..', 'views', 'study_view.ejs'));
    // ?num=',req.query.num,'&page=',page,'&kind=',req.query.kind,'&big=',req.query.big
});

router.get('/study/write', (req, res) => {
    console.log('study_insert');
    
});

router.get('/study/modify', (req, res) => {
    console.log('study_modify');
    
});


router.get('/study/delete', (req, res) => {
    console.log('study_delete');
    
});


// contest
router.get('/contest/list', (req, res) => {
    console.log('contest_list page');
    res.render(path.join(__dirname, '..', 'views', 'contest_list.ejs'));
});

router.get('/contest/view', (req, res) => {
    console.log('contest_view page');
    res.render(path.join(__dirname, '..', 'views', 'contest_view.ejs'));
});

router.get('/contest/write', (req, res) => {
    console.log('contest_insert');
    
});

router.get('/contest/modify', (req, res) => {
    console.log('contest_modify');
    
});


router.get('/contest/delete', (req, res) => {
    console.log('contest_delete');
    
});

module.exports = router; // 모듈로 만드는 부분