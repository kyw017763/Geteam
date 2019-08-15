const express = require('express');
const path = require('path');

const Member = require('../models/member.js');
const Study = require('../models/study.js');
const Contest = require('../models/contest.js');
const ApplyStudy = require('../models/apply_study.js');
const ApplyContest = require('../models/apply_contest.js');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const router = express.Router(); // 라우터 분리

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


// board list
router.get('/:kind/list', (req, res) => {
    console.log('It\'s board list page');

    let kind = req.params.kind;
    let item_list;
    let page_title;
    
    if (kind==='study') {
        item_list = Study.allItem();
        page_title = '모든 스터디';
    } else if (kind==='contest') {
        item_list = Contest.allItem();
        page_title = '모든 공모전';
    }

    console.log(item_list);
    console.log(page_title);

    let sess = req.session;
    
    let cid = null;
    let cname = null;
    if(req.cookies.cookie_id !== undefined) {
        cid = req.cookies.cookie_id;
        console.log('cookie_id : '+cid);
    }
    if(req.cookies.cookie_id !== undefined) {
        cname = req.cookies.cookie_name;
        console.log('cookie_name : '+cname);
    }

    let user_list_num;
    Member.findOne({id : cid}).select('list_num').exec(function(err, userNum) {
        user_list_num = userNum.list_num;
    });
    console.log('list_num : '+user_list_num);

    res.setHeader('Content-Type', 'text/html');
    res.render(path.join(__dirname, '..', 'views', 'item_list.ejs'), {
        cookie_id: cid,
        cookie_name: cname,
        list: item_list,
        ptitle: page_title,
        kind: kind,
        user_list_num: user_list_num
    });
    res.end();
});

// board list subject
router.get('/:kind/list/:subject', (req, res) => {
    console.log('It\'s board list subjec page');

    let kind = req.params.kind;
    let subject = req.params.subject;

    let item_list;
    let page_title;

    if (kind==='study') {
        item_list = Study.subjectItem(subject);
        if(subject==='develop') {
            page_title = '개발 관련 스터디';
        } else if(subject==='design') {
            page_title = '디자인 관련 스터디';
        } else if(subject==='etc') {
            page_title = '기타 스터디 및 모임';
        }
    } else if (kine==='contest') {
        item_list = Contest.subjectItem(subject);
        if(subject==='develop') {
            page_title = '개발 관련 공모전';
        } else if(subject==='design') {
            page_title = '디자인 관련 공모전';
        } else if(subject==='etc') {
            page_title = '기타 공모전';
        } else if(subject==='idea') {
            page_title = '아이디어 관련 공모전';
        }
    }

    console.log(item_list);
    console.log(page_title);
 

    let sess = req.session;
    res.setHeader('Content-Type', 'text/html');

    let cid = null;
    if(req.cookies.cookie_id !== undefined) {
        cid = req.cookies.cookie_id;
        console.log('cookie_id : '+cid);
    }

    let user_list_num;
    Member.findOne({id : cid}).select('list_num').exec(function(err, userNum) {
        user_list_num = userNum.list_num;
    });
    console.log('list_num : '+user_list_num);

    res.setHeader('Content-Type', 'text/html');
    res.render(path.join(__dirname, '..', 'views', 'item_list.ejs'), {
        cookie_id: cid,
        cookie_name: cname,
        list: item_list,
        ptitle: page_title,
        kind: kind,
        subject: subject,
        user_list_num: user_list_num
    });
    res.end();
});

// board view
router.get('/:kind/view', (req, res) => {
    console.log('It\'s board view page');
    let id = req.params.id; // view id
});

// wirte, modify, delete, apply, apply_delete

module.exports = router; // 모듈로 만드는 부분