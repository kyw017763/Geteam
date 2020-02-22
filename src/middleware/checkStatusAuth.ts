export default async (req: any, res: any, next: any) => {
  if ((req.cookies.exp * 1000) < new Date().getTime()) {
    const refreshTokenResult = await fetch('http://localhost:3000/signin/refresh', {
      method: 'POST',
      headers: {
        Authorization: req.cookies.token,
      }
    })
    .then(res => res.json())
    .then(json => json);

    if (refreshTokenResult.success) {
      res.cookie('token', refreshTokenResult.data.accessToken);
      res.cookie('exp', refreshTokenResult.data.exp);
    }
  }

  if (res.locals.statusAuth) {
    res.redirect('/');
  } else {
    next();
  }
};
