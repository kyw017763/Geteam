import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import config from './../config';

const router = express.Router();
export default router;

// page, order은 query string으로 전달

router.get('/list/:kind', async (req, res) => {
  const { kind } = req.params;
  const page = req.query.page || 1;
  const order = req.query.order || 'createdAt';
  let list;
  let title;

  if (kind === 'study') {
    const listResult = await fetch(`${process.env.API || config.API}/boards/study/${page - 1}/${order}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${req.cookies.token}`,
      },
    }).then(res => res.json())
      .then(json => json);
  
    if (listResult.success) {
      list = listResult.data;
      title = '스터디';
    } else {
      // TODO: message
    }
  } else if (kind === 'contest') {
    const listResult = await fetch(`${process.env.API || config.API}/boards/contest/${page - 1}/${order}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${req.cookies.token}`,
      },
    }).then(res => res.json())
      .then(json => json);
  
    if (listResult.success) {
      list = listResult.data;
      title = '공모전 / 기타';
    } else {
      // TODO: message
    }
  } else {
    res.redirect('/board/list/study');
  }

  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'itemList.ejs'), {
    kind,
    title,
    list,
    page,
    order,
  });
});

router.get('/list/:kind/:category', async (req, res) => {
  const { kind, category } = req.params;
  const page = req.query.page || 1;
  const order = req.query.order || 'createdAt';
  let list;
  let title;

  if (kind === 'study' && (category === 'develop' || 'design' || 'etc')) {
    const listResult = await fetch(`${process.env.API || config.API}/boards/study/${category}/${page - 1}/${order}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${req.cookies.token}`,
      },
    }).then(res => res.json())
      .then(json => json);
  
    if (listResult.success) {
      list = listResult.data;
      title = `${category.charAt(0).toUpperCase() + category.slice(1)} 스터디`;
    } else {
      // TODO: message
    }
  } else if (kind === 'contest' && (category === 'develop' || 'design' || 'etc' || 'idea')) {
    const listResult = await fetch(`${process.env.API || config.API}/boards/contest/${category}/${page - 1}/${order}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${req.cookies.token}`,
      },
    }).then(res => res.json())
      .then(json => json);
  
    if (listResult.success) {
      list = listResult.data;
      title = `${category.charAt(0).toUpperCase() + category.slice(1)} '공모전 / 기타`;
    } else {
      // TODO: message
    }
  } else {
    res.redirect('/board/list/study');
  }

  res.setHeader('Content-Type', 'text/html');
  res.render(path.join(__dirname, '..', 'views', 'itemList.ejs'), {
    kind,
    category,
    title,
    list,
    page,
    order,
  });
});

router.get('/:kind/:id', async (req, res) => {
  const { kind, category, id } = req.params;
  const page = req.query.page || 1;
  const order = req.query.order || 'createdAt';
  const renderData: any = {};
  let listResult;

  if (kind === 'study') {
    listResult = await fetch(`${process.env.API || config.API}/board/study/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${req.cookies.token}`,
      },
    }).then(res => res.json())
      .then(json => json);
  } else if (kind === 'contest') {
    listResult = await fetch(`${process.env.API || config.API}/board/contest/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${req.cookies.token}`,
      },
    }).then(res => res.json())
      .then(json => json);
  } else {
    res.redirect('/board/list/study');
  }
  
  if (listResult.success) {
    renderData['item'] = listResult.data.result;
    renderData['enableModify'] = listResult.data.enableModify;
    renderData['enableApply'] = listResult.data.enableApply;
    renderData['isApplied'] = listResult.data.isApplied;
    renderData['isAccepted'] = listResult.data.isAccepted;
  } else {
    // TODO: message
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

router.post('/:kind/:category', async (req, res) => {
  const { kind, category } = req.params;
  let writeResult;

  if (kind === 'study' && (category === 'develop' || 'design' || 'etc')) {
    writeResult = await fetch(`${process.env.API || config.API}/board/study`, {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${req.cookies.token}`,
      },
      body: req.body
    }).then(res => res.json())
      .then(json => json);
  } else if (kind === 'contest' && (category === 'develop' || 'design' || 'etc' || 'idea')) {
    writeResult = await fetch(`${process.env.API || config.API}/board/contest`, {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${req.cookies.token}`,
      },
      body: req.body
    }).then(res => res.json())
      .then(json => json);
  } else {
    res.redirect('/board/list/study');
  }

  if (!writeResult.success) {
    // TODO: message
  }

  writeResult.data ? res.redirect(`board/${kind}/${writeResult.data}`) : res.redirect(`/board/list/${kind}/${category}`);
});

router.patch('/:kind/:category/:id', async (req, res) => {
  const { kind, category, id } = req.params;
  let modifyResult;

  if (kind === 'study' && (category === 'develop' || 'design' || 'etc')) {
    modifyResult = await fetch(`${process.env.API || config.API}/board/study/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `bearer ${req.cookies.token}`,
      },
      body: req.body
    }).then(res => res.json())
      .then(json => json);
  } else if (kind === 'contest' && (category === 'develop' || 'design' || 'etc' || 'idea')) {
    modifyResult = await fetch(`${process.env.API || config.API}/board/contest/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `bearer ${req.cookies.token}`,
      },
      body: req.body
    }).then(res => res.json())
      .then(json => json);
  } else {
    res.redirect('/board/list/study');
  }

  if (!modifyResult.success || !modifyResult.data) {
    // TODO: message
  }

  modifyResult.data ? res.redirect(`board/${kind}/${modifyResult.data}`) : res.redirect(`/board/list/${kind}/${category}`);
});

router.delete('/:kind/:category/:id', async (req, res) => {
  const { kind, category, id } = req.params;
  let removeResult;

  if (kind === 'study' && (category === 'develop' || 'design' || 'etc')) {
    removeResult = await fetch(`${process.env.API || config.API}/board/study/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `bearer ${req.cookies.token}`,
      },
    }).then(res => res.json())
      .then(json => json);
  } else if (kind === 'contest' && (category === 'develop' || 'design' || 'etc' || 'idea')) {
    removeResult = await fetch(`${process.env.API || config.API}/board/contest/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `bearer ${req.cookies.token}`,
      },
    }).then(res => res.json())
      .then(json => json);
  } else {
    res.redirect('/board/list/study');
  }

  if (!removeResult.success || !removeResult.data) {
    // TODO: message
  }

  res.redirect('/board/list/study');
});
