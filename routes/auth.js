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
    console.log('It\'s auth page');
});

// login, signup, signout
router.get('/signup', (req, res) => {
    console.log('signup page');
    res.render(path.join(__dirname, '..', 'views', 'signup.ejs'));
});

router.get('/signin', (req, res) => {
    console.log('signin page');
    res.render(path.join(__dirname, '..', 'views', 'signin.ejs'));
});

router.get('/signout', (req, res) => {
    console.log('signout page');

});

module.exports = router; // 모듈로 만드는 부분