const express = require('express');
const path = require('path');
const router = express.Router(); // 라우터 분리


// login, signup, signout
router.get('/signup', (req, res) => {
    console.log('signup page');
    res.setHeader('Content-Type', 'text/html');
    res.render(path.join(__dirname, '..', 'views', 'signup.ejs'));
    res.end();
});

router.get('/signin', (req, res) => {
    console.log('signin page');
    res.setHeader('Content-Type', 'text/html');
    res.render(path.join(__dirname, '..', 'views', 'signin.ejs'));
    res.end();
});

router.get('/signout', (req, res) => {
    console.log('signout page');

});

module.exports = router; // 모듈로 만드는 부분