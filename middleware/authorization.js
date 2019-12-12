import jwt from 'jsonwebtoken';

// eslint-disable-next-line consistent-return
const authMiddleware = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.query.token;

  if (!token) {
    req.flash('로그인 후 접근할 수 있습니다');
    res.status(403).redirect('/signin');
  }

  const p = new Promise(
    (resolve, reject) => {
      jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    },
  );

  const onError = (error) => {
    req.flash('인증 중 오류가 발생했습니다');
    res.status(403).redirect('signin');
  };

  p.then((decoded) => {
    console.log(`decoded: ${decoded}`);
    req.decoded = decoded;
    next();
  }).catch(onError); // onError() 형태로 넣으면 함수가 바로 실행돼서 문제가 된다
};

export default authMiddleware;
