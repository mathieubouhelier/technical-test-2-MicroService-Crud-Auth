const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './../.env' });

const secret = process.env.SECRET;
function createToken(payload) {
  const headers = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, secret, headers);

  return token;
}

module.exports = createToken;
