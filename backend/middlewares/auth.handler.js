const boom = require('@hapi/boom');

const { config } = require('./../config/config');
const jwt = require('jsonwebtoken');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}
function checkAdminRole(req, res, next) {
  const user = req.user;
  if (user.role === 'admin') {
    next();
  } else {
    next(boom.unauthorized());
  }
}
function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  };
}

function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) return res.sendStatus(401);
  console.log('soy un error');

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}
module.exports = { checkApiKey, checkAdminRole, checkRoles, authenticateToken };
