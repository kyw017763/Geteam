/* eslint-disable prefer-destructuring */
import express from 'express';
import path from 'path';

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
    pageTitle = `${req.params.category.charAt(0).toUpperCase() + req.params.category.slice(1)} 스터디`;
  } else if (kind === 'contest') {
    itemList = await Contest.getContestsByCategory(req.params.category, page - 1, listOrder);
    pageTitle = `${req.params.category.charAt(0).toUpperCase() + req.params.category.slice(1)} 공모전`;
  } else {
    res.redirect('board/study/list/develop');
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

router.post('/:kind', (req, res) => {
  if (req.params.kind === 'study') {
    Study.createStudy(
      req.body.writeMem,
      req.body.writeKind,
      req.body.writeTopic,
      req.body.writeTitle,
      req.body.writeContent,
      req.body.writeWantNum,
      req.body.writeEndDay,
    );
  } else if (req.params.kind === 'contest') {
    Contest.createContest(
      req.body.writeMem,
      req.body.writeKind,
      req.body.writeTopic,
      req.body.writeTitle,
      req.body.writeContent,
      req.body.writeWantNum,
      req.body.writeEndDay,
    );
  } else {
    res.redirect('board/study/list/develop');
  }

  res.redirect(`/board/${req.params.kind}/list/${req.body.writeKind}`);
});

router.delete('/:kind', (req, res) => {
  if (req.params.kind === 'study') {
    Study.removeStudy(req.query.itemId);
  } else if (req.params.kind === 'contest') {
    Contest.removeContest(req.query.itemId);
  } else {
    res.redirect('board/study/list/develop');
  }

  res.redirect(`/board/${req.params.kind}/list/develop`);
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
router.get('/:kind/view/:category/:id', async (req, res) => {
  console.log('It\'s board view page');

  const kind = req.params.kind;
  const page = req.query.page || 1;
  let item;
  let isApplied;

  if (kind === 'study') {
    item = await Study.getStudyByItemId(req.params.id);
    isApplied = await StudyApply.isApplied(req.decoded.jti, kind, item.num);
  } else if (kind === 'contest') {
    item = await Contest.getContestByItemId(req.params.id);
    isApplied = await ContestApply.isApplied(req.decoded.jti, kind, item.num);
  } else {
    res.redirect('board/study/list/develop');
  }

  item.memName = await Member.getMemberById(item.mem);

  res.setHeader('Content-Type', 'text/html');

  res.render('./itemView.ejs', {
    userId: req.decoded.jti,
    userName: req.decoded.name,
    kind,
    category: req.params.category,
    item,
    page,
    isApplied,
  });
  res.end();
});
