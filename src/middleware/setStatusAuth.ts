import config from './../config';

export default async (req: any, res: any, next: any) => {
  try {
    const token = req.cookies.token || null;
    if (!token) {
      throw new Error();
    }

    const tokenVerifyResult = await fetch(`${process.env.API || config.API}/verify`, {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${token}`,
      }
    }).then(res => res.json())
      .then(json => json);

    if (tokenVerifyResult.success) {
      // TODO: API에 fetch(GET)해서 res.locals.badgeCal 지정하도록
      res.locals.badgeCal = 0;
      res.locals.statusAuth = true;
      res.locals.message = req.flash('message'),
      req.decoded = tokenVerifyResult.data;
    } else {
      const refreshTokenResult = await fetch(`${process.env.API || config.API}/signin/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `bearer ${token}`,
        }
      }).then(res => res.json())
        .then(json => json);
      
      if (refreshTokenResult.success) {
        res.cookie('token', refreshTokenResult.data.accessToken);
        res.cookie('exp', refreshTokenResult.data.exp);
      }

      res.locals.statusAuth = false;
    }
  } catch (err) {
    res.locals.statusAuth = false;
  }
  
  next();
};
