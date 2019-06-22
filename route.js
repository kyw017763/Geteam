const express = require('express');
const path = require('path');
const router = express.Router(); // 라우터 분리

// 없으면 경로 안맞음
router.use(express.static(__dirname));

router.get('/', (req, res) => {
    console.log('index page');
    res.render(path.join(__dirname, 'views', 'index.html'));
});

// login, signup, signout
router.get('/signup', (req, res) => {
    console.log('signup page');
    res.render(path.join(__dirname, 'views', 'signup.html'));
});

router.get('/signin', (req, res) => {
    console.log('signin page');
    res.render(path.join(__dirname, 'views', 'signin.html'));
});

router.get('/signout', (req, res) => {
    console.log('signout page');

});


// study
router.get('/study/list', (req, res) => {
    console.log('study_list page');
    res.render(path.join(__dirname, 'views', 'study_list.html'));
    // ?kind=',req.query.kind,'&big=',req.query.big
});

router.get('/study/view', (req, res) => {
    console.log('study_view page');
    res.render(path.join(__dirname, 'views', 'study_view.html'));
    // ?num=',req.query.num,'&page=',page,'&kind=',req.query.kind,'&big=',req.query.big
});

router.get('/study/insert', (req, res) => {
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
    res.render(path.join(__dirname, 'views', 'contest_list.html'));
});

router.get('/contest/view', (req, res) => {
    console.log('contest_view page');
    res.render(path.join(__dirname, 'views', 'contest_view.html'));
});

router.get('/contest/insert', (req, res) => {
    console.log('contest_insert');
    
});

router.get('/contest/modify', (req, res) => {
    console.log('contest_modify');
    
});


router.get('/contest/delete', (req, res) => {
    console.log('contest_delete');
    
});


// note
router.get('/note/send', (req, res) => {
    console.log('note_send page');
    res.render(path.join(__dirname, 'views', 'note_send.html'));
});

router.get('/note/recv', (req, res) => {
    console.log('note_recv page');
    res.render(path.join(__dirname, 'views', 'note_recv.html'));
});

router.get('/note/insert', (req, res) => {
    console.log('note_insert');
    
});

router.get('/note/delete', (req, res) => {
    console.log('note_delete');
    
});


// mypage
router.get('/mypage', (req, res) => {
    console.log('mypage page');
    res.sendFile(path.join(__dirname, 'views', 'mypage.html'));
});


module.exports = router; // 모듈로 만드는 부분