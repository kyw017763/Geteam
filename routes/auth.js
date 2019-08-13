const express = require('express');
const path = require('path');

const Member = require('../models/member.js');
const Counting = require('../models/counting.js');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nodemailer = require('nodemailer');

const app = express();
const router = express.Router(); // 라우터 분리

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


router.get('/', (req, res) => {
    console.log('index page');

    Counting.find({}, function(err, counting) {
        console.log('returned document : '+counting.length);
        if(counting.length === 0) Counting.create({});
    });

    Counting.findOneAndUpdate({}, { $inc: { visit : 1 } });
    
    res.setHeader('Content-Type', 'text/html');
    let sess = req.session;
    console.log('signin : '+sess.userid);

    // 접근 권한 없이 board, note, mypage에 접근했을 경우
    let m = sess.message;
    sess.message = null;
    
    Counting.findOne({}, function(err, counting) {
        console.log(counting);
        res.render(path.join(__dirname, '..', 'views', 'index.ejs'), {
            message: m,
            c: counting
        });
    });
    
    // res.end();
});

// 문의 메일
router.post('/', (req, res) => {
    console.log('question email');

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 's2017s04@e-mirim.hs.kr',
            pass: ''
        }
    });

    const message = req.body.question_content;
    const mResult = message.replace(/(?:\r\n|\r|\n)/g, '<br />');
    const mailOptions = {
        from: 's2017s04@e-mirim.hs.kr',
        to: req.body.question_recv,
        subject: '[ZTEAM question]'+message.substring(0,10),
        html: '<h1>문의사항</h1>'+mResult,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err);
        } else {
            console.log('Message sent : ' + info.response);
        }
        transporter.close();
    });

    res.redirect('/');
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
    let str;
    let flag;

    const regxEmail = /[A-Za-z0-9]{8}@e-mirim.hs.kr/;
    const regxPwd = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,15}$/;
    let resultEmail = regxEmail.exec(req.body.signup_email);
    let resultPwd = regxPwd.exec(req.body.signup_pwd);

    if(!resultEmail) {
        str = '학교 이메일 형식은 @e-mirim.hs.kr 입니다';
        flag = 1;
    } else if (!resultPwd) {
        str = '비밀번호 형식이 틀립니다';
        flag = 1;
    }
    if(flag === 1) {
        sess.message = str;
        return res.redirect('/signup');
    } else {
    
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
            if(err){
                if (err.name === 'MongoError' && err.code === 11000) {
                    console.log('go to signup');
                    str = '중복된 이메일로 가입하실 수 없습니다!';
                    sess.message = str;
                    return res.redirect('/signup');
                }
            }

            Counting.updateMember();
            console.log('go to signin');
            return res.redirect('/signin');
        });
    }
});

router.get('/signin', (req, res) => {
    console.log('signin page');

    let sess = req.session;
    res.setHeader('Content-Type', 'text/html');

    let cid = null;
    if(req.cookies.cookie_id !== undefined) {
        cid = req.cookies.cookie_id;
        console.log('cookie_id : '+cid);
    }

    let m = sess.message;
    console.log('signin fail message: '+m);
    sess.message = null;

    res.setHeader('Content-Type', 'text/html');
    res.render(path.join(__dirname, '..', 'views', 'signin.ejs'), {
        message: m,
        cookie_id: cid
    });
    res.end();
});

router.post('/signin', (req, res) => {
    console.log('signin db connect page');

    let sess = req.session;
    
    let id = req.body.signin_email;
    let pwd = req.body.signin_pwd;

    // checkbox 체크 시 쿠키 
    if(req.body.id_ck == 'yes') {
        res.cookie('cookie_id', id);
    }

    // 로그인 로직
    let str = null;
    try {
        Member.findOne({id : id}).select('id').exec(function(err, idCheckUser) { // 아이디만 가져와서 맞음 or 틀림
            Member.findOne({id : id, pwd: pwd}, function(err, user) { // 로그인 완료
                console.log(idCheckUser);
                console.log(user);
                if(user) { // 로그인
                    console.log('pass user');
                    if(idCheckUser) {
                        console.log('pass idcheckuser');
                        sess.userid = idCheckUser.id;
                        sess.username = user.name;
                        res.redirect('/');
                    }
                } else {
                    if(idCheckUser) { // 아이디로 찾았을 때에는 있음
                        str = '해당 이메일 또는 비밀번호가 틀렸습니다';
                        // res.status(401).send('해당 이메일 또는 비밀번호가 틀렸습니다');
                    } else { // 아이디로 찾았을 때 없으니 아예 가입이 안 돼있음
                        str = '해당 이메일로 가입된 계정이 없습니다';
                        // res.status(401).send('해당 이메일로 가입된 계정이 없습니다');
                    }
                    sess.message = str;
                    res.redirect('/signin');
                }
            });
        });
    } catch (e) {
        res.redirect('/signin');
        return console.log(e);
    }
});

router.post('/signin/find', (req, res) => {
    console.log('find pwd page');

    try {
        console.log(req.body.find_email);
        Member.findOne({id : req.body.find_email}).exec(function(err, idCheckUser) { // 아이디만 가져와서 맞음 or 틀림
            if(idCheckUser) {
                switch(req.body.find_hint){
                    case idCheckUser.interest1:
                    case idCheckUser.interest2:
                    case idCheckUser.interest3:    
                    sendEmail(idCheckUser.pwd);
                }
            }
        });
    } catch(e) {
        console.log(e);
        return res.redirect('/signin');
    }

    function sendEmail(pwd) {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 's2017s04@e-mirim.hs.kr',
                pass: 'LimKimwon7763*'
            }
        });

        let message = req.body.find_email+'님의 비밀번호는 <span style="background: #efdc05;">'+pwd+'</span> 입니다.'
        const mailOptions = {
            from: 's2017s04@e-mirim.hs.kr',
            to: req.body.find_email,
            subject: '[ZTEAM 비밀번호 찾기]',
            html: '<h1>비밀번호 찾기</h1>'+message,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                console.log(err);
            } else {
                console.log('Message sent : ' + info.response);
            }
            transporter.close();
        });
    }
    res.redirect('/');
});

router.get('/signout', (req, res) => {
    console.log('signout page');

    console.log(req.session.userid);
    console.log(req.session.username);

    delete req.session.userid;
    delete req.session.username;

    res.redirect('/');
});

module.exports = router; // 모듈로 만드는 부분