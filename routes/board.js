/* eslint-disable prefer-destructuring */
import express from 'express';
import path from 'path';

import Member from '../models/member';
import Study from '../models/study';
import Contest from '../models/contest';

const router = express.Router();
export default router;

router.get('/:kind/list/:category', async (req, res) => {
  console.log('It\'s board list page');

  const kind = req.params.kind;
  const page = req.query.page || 1;
  const listOrder = req.query.order || 'num';
  let itemList;
  let pageTitle;

  if (kind === 'study') {
    itemList = await Study.getStudiesByCategory(req.params.category, page - 1, listOrder);
    pageTitle = `${req.params.category} 스터디`;
  } else if (kind === 'contest') {
    itemList = await Contest.getContestsByCategory(req.params.category, page - 1, listOrder);
    pageTitle = `${req.params.category} 공모전`;
  }

  // userListNum
  const userListNum = await Member.getMemberListNumById(req.decoded.jti);

  res.setHeader('Content-Type', 'text/html');

  res.render('./itemList.ejs', {
    userId: req.decoded.jti,
    userName: req.decoded.name,
    userListNum,
    pageTitle,
    kind,
    category: req.params.category,
    itemList,
    page,
  });
  res.end();
});

router.get('/:kind/list/search', (req, res) => {
  console.log('It\'s board list search page');

  const key = req.body.search;

  const kind = req.params.kind;
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

  let listNum;
  Member.findOne({ id: req.cookie.id }).select('list_num').exec((err, userNum) => {
    listNum = userNum.list_num;
  });
  console.log(`listNum : ${listNum}`);

  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'item_List.ejs'), {
    userId: req.cookie.id,
    userName: req.cookie.name,
    list: itemList,
    ptitle: pageTitle,
    kind,
    listNum,
    key,
  });
});

// board view
router.get('/:kind/view/:id', (req, res) => {
  console.log('It\'s board view page');

  const id = req.params.id; // view id

  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'item_view.ejs'), {
    userId: req.cookie.id,
    userName: req.cookie.name,
  });
  res.end();
});

// wirte, modify, delete, apply, apply_delete
router.post('/:kind/view', (req, res) => {
  console.log('It\'s board view page');

  const id = req.params.id; // view id

  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'item_view.ejs'), {
    userId: req.cookie.id,
    userName: req.cookie.name,
    // scale,
  });
  res.end();
});
