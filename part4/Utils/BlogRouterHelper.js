function readJWTToken(req) {
  const authorization = req.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    const JWT_TOKEN = authorization.replace('Bearer ', '');
    return JWT_TOKEN;
  } else return null;
}

export default { readJWTToken };
