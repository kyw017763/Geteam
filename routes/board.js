/* eslint-disable prefer-destructuring */
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

import Member from '../models/member';
import Study from '../models/study';
import Contest from '../models/contest';

const router = express.Router();
export default router;

router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());

let cid = null;
let cname = null;

router.use((req, res, next) => { // cookies
  if (!req.cookies.cookie_id) {
    cid = req.cookies.cookie_id;
    console.log(`cookie_id : ${cid}`);
  }
  if (!req.cookies.cookie_id) {
    cname = req.cookies.cookie_name;
    console.log(`cookie_name : ${cname}`);
  }
  next();
});

// board list
router.get('/:kind/list', (req, res) => {
  console.log('It\'s board list page');

  const kind = req.params.kind;
  const sess = req.session;
  let itemList = null;
  let pageTitle = null;
  let page;
  let scale;

  // itemList, pageTitle
  if (kind === 'study') {
    itemList = Study.allItem();
    pageTitle = '모든 스터디';
  } else if (kind === 'contest') {
    itemList = Contest.allItem();
    pageTitle = '모든 공모전';
  }

  // range
  let range = null;
  if (req.query.range) {
    range = req.query.range;
    if (range === 'num') {
      itemList.sort((now, next) => now.num - next.num);
    } else if (range === 'author') {
      itemList.sort((now, next) => now.author - next.author);
    } else if (range === 'topic') {
      itemList.sort((now, next) => now.topic - next.topic);
    } else if (range === 'title') {
      itemList.sort((now, next) => now.title - next.title);
    }
  }

  // scale, page
  if (req.cookies.scale !== undefined) {
    scale = req.cookies.scale;
  } else {
    const s = 10;
    res.cookie('scale', s);
    scale = s;
  }
  console.log(`scale : ${scale}`);

  if (req.query.page) {
    page = req.query.page;
  } else {
    page = 1;
  }

  // user_list_num
  let user_list_num;
  Member.findOne({ id: cid }).select('list_num').exec((err, userNum) => {
    user_list_num = userNum.list_num;
  });
  console.log(`list_num : ${user_list_num}`);

  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'item_list.ejs'), {
    cookie_id: cid,
    cookie_name: cname,
    list: itemList,
    ptitle: pageTitle,
    kind,
    user_list_num,
    page,
    scale,
  });
  res.end();
});

router.get('/:kind/list/search', (req, res) => {
  console.log('It\'s board list search page');

  const key = req.body.search;

  const kind = req.params.kind;
  const sess = req.session;
  let itemList = null;
  let pageTitle = null;
  let page;
  let scale;

  // item_list, page_title
  if (kind === 'study') {
    itemList = Study.findItem(key);
    pageTitle = '검색된 스터디';
  } else if (kind === 'contest') {
    itemList = Contest.findItem(key);
    pageTitle = '검색된 공모전';
  }

  // scale, page
  if (req.cookies.scale !== undefined) {
    scale = req.cookies.scale;
  } else {
    const s = 10;
    res.cookie('scale', s);
    scale = s;
  }
  console.log(`scale : ${scale}`);

  if (req.query.page) {
    page = req.query.page;
  } else {
    page = 1;
  }

  // user_list_num
  let user_list_num;
  Member.findOne({ id: cid }).select('list_num').exec((err, userNum) => {
    user_list_num = userNum.list_num;
  });
  console.log(`list_num : ${user_list_num}`);

  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'item_list.ejs'), {
    cookie_id: cid,
    cookie_name: cname,
    list: itemList,
    ptitle: pageTitle,
    kind,
    user_list_num,
    key,
  });
});

// board list subject
router.get('/:kind/list/:subject', (req, res) => {
  console.log('It\'s board list subject page');

  const kind = req.params.kind;
  const subject = req.params.subject;
  let itemList = null;
  let pageTitle = null;
  let page;
  let scale;
  const sess = req.session;

  // cookies
  if (req.cookies.scale !== undefined) {
    scale = req.cookies.scale;
    console.log(`scale : ${scale}`);
  } else {
    const s = 10;
    res.cookie('scale', s);
    scale = s;
  }

  if (req.query.page) {
    page = req.query.page;
  } else {
    page = 1;
  }

  // item_list, page_title
  if (kind === 'study') {
    itemList = Study.subjectItem(subject);
    if (subject === 'develop') {
      pageTitle = '개발 관련 스터디';
    } else if (subject === 'design') {
      pageTitle = '디자인 관련 스터디';
    } else if (subject === 'etc') {
      pageTitle = '기타 스터디 및 모임';
    }
  } else if (kind === 'contest') {
    itemList = Contest.subjectItem(subject);
    if (subject === 'develop') {
      pageTitle = '개발 관련 공모전';
    } else if (subject === 'design') {
      pageTitle = '디자인 관련 공모전';
    } else if (subject === 'etc') {
      pageTitle = '기타 공모전';
    } else if (subject === 'idea') {
      pageTitle = '아이디어 관련 공모전';
    }
  }

  let user_list_num;
  Member.findOne({ id: cid }).select('list_num').exec((err, userNum) => {
    user_list_num = userNum.list_num;
  });
  console.log(`list_num : ${user_list_num}`);

  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'item_list.ejs'), {
    cookie_id: cid,
    cookie_name: cname,
    list: itemList,
    ptitle: pageTitle,
    kind,
    subject,
    user_list_num,
    page,
    scale,
  });
  res.end();
});

// board view
router.get('/:kind/view', (req, res) => {
  console.log('It\'s board view page');

  const sess = req.session;
  const id = req.params.id; // view id

  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'item_view.ejs'), {
    cookie_id: cid,
    cookie_name: cname,
    // 게시판 상세보기용 값들 필요함
    // list: itemList,
    // ptitle: pageTitle,
    // kind,
    // subject,
    // user_list_num,
    // page,
    // scale,
  });
  res.end();
});

// wirte, modify, delete, apply, apply_delete
