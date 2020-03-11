import express from 'express';
import fetch from 'node-fetch';
import config from './../config';

const router = express.Router();
export default router;

router.post('/:kind', async (req, res) => {
  const { kind } = req.params;
  const { applyKind, applyItem } = req.body;
  let applyResult;

  if (kind === 'study' && (applyKind === 'develop' || 'design' || 'etc')) {
    applyResult = await fetch(`${process.env.API || config.API}/apply/${kind}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${req.cookies.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    }).then(res => res.json())
      .then(json => json);
  } else if (kind === 'contest' && (applyKind === 'develop' || 'design' || 'etc' || 'idea')) {
    applyResult = await fetch(`${process.env.API || config.API}/apply/${kind}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${req.cookies.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body),
    }).then(res => res.json())
      .then(json => json);
  } else {
    res.redirect(`/board/${kind}/${applyItem}`);
  }

  if (!applyResult.success) {
    // TODO: message
  }

  return applyResult.data ? res.redirect(`/board/${kind}/${applyResult.data}`) : res.redirect(`/board/${kind}/${applyItem}`);
});

router.patch('/:kind/:itemId/:applyId', async (req, res) => {
  const { kind, itemId, applyId } = req.params;
  let acceptResult;

  if (kind === 'study' || kind === 'contest') {
    acceptResult = await fetch(`${process.env.API || config.API}/apply/study/${applyId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${req.cookies.token}`,
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
      .then(json => json);
  } else {
    res.redirect(`/board/${kind}/${itemId}`);
  }

  if (!acceptResult.success || !acceptResult.data) {
    // TODO: message
  }

  return acceptResult.data ? res.redirect(`/board/${kind}/${acceptResult.data}`) : res.redirect(`/board/${kind}/${itemId}`);
});

router.delete('/:kind/:itemId/:applyId', async (req, res) => {
  const { kind, itemId, applyId } = req.params;
  let cancelResult;

  if (kind === 'study' || kind === 'contest') {
    cancelResult = await fetch(`${process.env.API || config.API}/apply/${kind}/${applyId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${req.cookies.token}`,
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
      .then(json => json);
  } else {
    res.redirect(`/board/${kind}/${itemId}`);
  }

  if (!cancelResult.success || !cancelResult.data) {
    // TODO: message
  }

  return cancelResult.data ? res.redirect(`/board/${kind}/${cancelResult.data}`) : res.redirect(`/board/${kind}/${itemId}`);
});

router.patch('/team/:kind/:id', async (req, res, next) => {
  const { kind, id } = req.params;
  let status = null;
  await fetch(`${process.env.API || config.API}/apply/team/${kind}/${id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${req.cookies.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    })
    .then(res => {
      status = res.status;
      if (res.status === 200) return res.json();
    });
  
  return status === 200 ? res.redirect(`/board/${kind}/${id}`) : res.redirect(`/board/${kind}/${id}`) ;
});
