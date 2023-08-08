function readJWTToken(req, res, next) {
  const authorization = req.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    const JWT_TOKEN = authorization.replace('Bearer ', '');
    req.token = JWT_TOKEN;
  } else {
    req.token = null;
  }
  next();
}

export default { readJWTToken };
