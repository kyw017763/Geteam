import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import config from './../config';

const router = express.Router();
export default router;

// page, order은 query string으로 전달

router.get('/list/:kind', async (req, res) => {
  const { kind } = req.params;
  const page: number = req.query.page || 1;
  const order: string = req.query.order || 'createdAt';
  let list = null;
  let total: number = 0;
  let title: string;
  let status: number;
  let listResult;

  if (kind === 'study') {
    title = '스터디';
  } else if (kind === 'contest') {
    title = '공모전 / 기타';
  } else {
    return res.redirect('/board/list/study');
  }

  listResult = await fetch(`${process.env.API || config.API}/boards/${kind}/${page - 1}/${order}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${req.cookies.token}`,
    },
  }).then((res) => {
    status = res.status;
    if (status === 200) return res.json();
  });

  if (status! === 204) {
  } else if (status! === 200) {
    list = listResult.data.list;
    total = listResult.data.total;
  } else {
    // TODO: message
  }

  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'itemList.ejs'), {
    kind,
    title,
    list,
    total,
    page,
    order,
  });
});

router.get('/list/:kind/:category', async (req, res) => {
  const { kind, category } = req.params;
  const page: number = req.query.page || 1;
  const order: string = req.query.order || 'createdAt';
  let list = null;
  let total: number = 0;
  let title: string;
  let status: number;
  let listResult;

  if (kind === 'study' && (category === 'develop' || 'design' || 'etc')) {
    listResult = await fetch(`${process.env.API || config.API}/boards/study/${category}/${page - 1}/${order}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${req.cookies.token}`,
      },
    }).then(res => {
      status = res.status;
      if (status === 200) return res.json();
    })
    title = `${category.charAt(0).toUpperCase() + category.slice(1)} 스터디`;
  } else if (kind === 'contest' && (category === 'develop' || 'design' || 'etc' || 'idea')) {
    listResult = await fetch(`${process.env.API || config.API}/boards/contest/${category}/${page - 1}/${order}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${req.cookies.token}`,
      },
    }).then(res => {
      status = res.status;
      if (status === 200) return res.json();
    });
    title = `${category.charAt(0).toUpperCase() + category.slice(1)} 공모전 / 기타`;
  } else {
    return res.redirect('/board/list/study');
  }

  if (status! === 204) {
  } else if (status! === 200) {
    list = listResult.data.list;
    total = listResult.data.total;
  } else {
    // TODO: message
  }

  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'itemList.ejs'), {
    kind,
    category,
    title,
    list,
    total,
    page,
    order,
  });
});

router.get('/:kind/:id', async (req, res) => {
  const { kind, category, id } = req.params;
  const page: number = req.query.page || 1;
  const order: string = req.query.order || 'createdAt';
  let status: number;
  let itemResult;
  let appliesResult;
  const renderData: any = {};

  if (kind === 'study' || kind === 'contest') {
    itemResult = await fetch(`${process.env.API || config.API}/board/${kind}/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${req.cookies.token}`,
      },
    }).then(res => {
      status = res.status;
      if (status === 200) return res.json();
    });
  } else {
    res.redirect('/board/list/study');
  }
  
  if (status! === 204) {
  } else if (status! === 200) {
    renderData['item'] = itemResult.data.result;
    renderData['enableModify'] = itemResult.data.enableModify;
    renderData['enableApply'] = itemResult.data.enableApply;
    renderData['isApplied'] = itemResult.data.isApplied;
    renderData['applyId'] = itemResult.data.applyId;
    renderData['isAccepted'] = itemResult.data.isAccepted;

    if (res.locals.decoded._id === renderData['item'].account._id) {
      appliesResult = await fetch(`${process.env.API || config.API}/apply/${kind}/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${req.cookies.token}`,
        },
      }).then(res => {
        status = res.status;
        if (status === 200) return res.json();
      });
    }
  } else {
    // TODO: message
  }

  if (status! === 200) {
    renderData['applies'] = appliesResult.data;
  } else {
    renderData['applies'] = null;
  }

  res.setHeader('Content-Type', 'text/html');

  res.render(path.join(__dirname, '..', 'views', '/itemView.ejs'), {
    kind,
    category,
    id,
    page,
    order,
    ...renderData,
  });
});

router.post('/:kind', async (req, res) => {
  const { kind } = req.params;
  const { category } = req.body;
  let writeResult;

  if (kind === 'study' && (category === 'develop' || 'design' || 'etc')) {
    writeResult = await fetch(`${process.env.API || config.API}/board/study`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${req.cookies.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    }).then(res => res.json())
      .then(json => json);
  } else if (kind === 'contest' && (category === 'develop' || 'design' || 'etc' || 'idea')) {
    writeResult = await fetch(`${process.env.API || config.API}/board/contest`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${req.cookies.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body),
    }).then(res => res.json())
      .then(json => json);
  } else {
    res.redirect(`/board/list/${kind}/${category}`);
  }

  if (!writeResult.success) {
    // TODO: message
  }

  return writeResult.data ? res.redirect(`/board/${kind}/${writeResult.data}`) : res.redirect(`/board/list/${kind}/${category}`);
});

// category가 변경될 수 있으므로 url에 포함하지 않음
router.patch('/:kind/:id', async (req, res) => {
  const { kind, id } = req.params;
  const { modifyCategory: category } = req.body;
  let modifyResult;

  if (kind === 'study' && (category === 'develop' || 'design' || 'etc')) {
    modifyResult = await fetch(`${process.env.API || config.API}/board/study/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${req.cookies.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body),
    }).then(res => res.json())
      .then(json => json);
  } else if (kind === 'contest' && (category === 'develop' || 'design' || 'etc' || 'idea')) {
    modifyResult = await fetch(`${process.env.API || config.API}/board/contest/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${req.cookies.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body),
    }).then(res => res.json())
      .then(json => json);
  } else {
    res.redirect(`/board/list/${kind}/${category}`);
  }

  if (!modifyResult.success || !modifyResult.data) {
    // TODO: message
  }

  return modifyResult.data ? res.redirect(`/board/${kind}/${modifyResult.data}`) : res.redirect(`/board/list/${kind}/${category}`);
});

router.delete('/:kind/:category/:id', async (req, res) => {
  const { kind, category, id } = req.params;
  let removeResult;

  if (kind === 'study' && (category === 'develop' || 'design' || 'etc')) {
    removeResult = await fetch(`${process.env.API || config.API}/board/study/${id}`, {
      method: 'DELETE',
      body: JSON.stringify(req.body),
      headers: {
        'Authorization': `Bearer ${req.cookies.token}`,
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
      .then(json => json);
  } else if (kind === 'contest' && (category === 'develop' || 'design' || 'etc' || 'idea')) {
    removeResult = await fetch(`${process.env.API || config.API}/board/contest/${id}`, {
      method: 'DELETE',
      body: JSON.stringify(req.body),
      headers: {
        'Authorization': `Bearer ${req.cookies.token}`,
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
      .then(json => json);
  } else {
    res.redirect(`/board/list/${kind}/${category}`);
  }

  if (!removeResult.success || !removeResult.data) {
    // TODO: message
  }

  return res.redirect(`/board/list/${kind}/${category}`);
});
