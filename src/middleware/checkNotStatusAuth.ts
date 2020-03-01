export default async (req: any, res: any, next: any) => {
  if (res.locals.statusAuth) {
    return res.redirect('/');
  } else {
    next();
  }
};
