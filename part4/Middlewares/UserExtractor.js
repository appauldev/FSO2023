import jwt from 'jsonwebtoken';
import config from '../Config/config.js';

function getUser(req, res, next) {
  const decoded_token = jwt.verify(req.token, config.getJWTSecret());

  req.user = {
    id: decoded_token.id,
    username: decoded_token.username,
  };

  next();
}

export default { getUser };
