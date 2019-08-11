const express = require('express');
const path = require('path');
const Member = require('../models/member.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const router = express.Router(); // 라우터 분리

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
    secret: 'yewon kim',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
    }
}))


router.get('/', (req, res) => {
    console.log('index page');
    res.setHeader('Content-Type', 'text/html');
    res.render(path.join(__dirname, '..', 'views', 'index.ejs'));
    res.end();
});

// login, signup, logout
router.get('/signup', (req, res) => {
    console.log('signup page');

    let sess = req.session;
    res.setHeader('Content-Type', 'text/html');
    let m = sess.message;
    sess.message = null;
    res.render(path.join(__dirname, '..', 'views', 'signup.ejs'), {
        message: m
    });
    
    res.end();
});

router.post('/signup', (req, res) => {
    console.log('signup db connect page');
    let sess = req.session;
    
    Member.create({
        id: req.body.signup_email,
        name: req.body.signup_name,
        pwd: req.body.signup_pwd,
        s_num: req.body.signup_num,
        interest1: req.body.signup_inter1,
        interest2: req.body.signup_inter2,
        interest3: req.body.signup_inter3,
        profile: req.body.signup_profile
    }, function(err){
        if (err.name === 'MongoError' && err.code === 11000) {
            console.log('go to signup');
            let str = '중복된 이메일로 가입하실 수 없습니다!';
            sess.message = str;
            return res.redirect('/signup');
        }
        
        console.log('go to signin');
        return res.redirect('/signin');
    });
});

router.get('/signin', (req, res) => {
    console.log('signin page');

    res.setHeader('Content-Type', 'text/html');
    res.render(path.join(__dirname, '..', 'views', 'signin.ejs'));
    res.end();
});

router.post('/signin', (req, res) => {
    console.log('signin db connect page');

    // checkbox 체크 시 쿠키 
    if(req.body.id_ck == "yes") {
        res.cookie('cookie_id',req.body.signin_email,{options});
    }

    let id = req.body.signin_email;
    let pwd = req.body.signin_pwd;

    // DB 확인 - 로그인 로직
    try {
        let user = Member.checkSignin(id, pwd); // 로그인 완료
        let idCheckUser = Member.checkSignin(id); // 아이디만 맞음 or 틀림

        if(user) {
            session.userid = user.id;
            session.userpwd = user.pwd;
            res.send('로그인되었습니다');
            res.redirect('/');
        } else {
            if(idCheckUser) {
                res.send('해당 이메일 또는 비밀번호는 틀렸습니다');
                res.sendStatus(401);
            } else {
                res.send('해당 이메일로 가입된 계정이 없습니다');
                res.sendStatus(401);
            }
            res.redirect('/signin');
        }
    } catch (e) {
        res.redirect('/signin');
        return console.log(e);
    }
});

router.get('/signout', (req, res) => {
    console.log('signout page');

    delete req.session.userid;
    delete req.session.username;

    res.send(`<script>location.href='/';</script>`);
});

module.exports = router; // 모듈로 만드는 부분