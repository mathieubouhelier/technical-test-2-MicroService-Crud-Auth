const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './../.env' });
const secret = process.env.SECRET;


const validateJWTBasic = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const data = jwt.verify(token, secret);

    if (!data) {
      return res.status(401).json({ message: 'jwt malformed' });
    }

    req.data = data;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

const validateJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
console.log('secret', secret);
console.log('token:', token);
    const data = jwt.verify(token, secret);
    console.log('data:', data);
    if (!data) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }

    req.data = data;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = { validateJWTBasic, validateJWT };
