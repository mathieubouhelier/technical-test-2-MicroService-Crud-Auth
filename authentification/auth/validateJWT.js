const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const validateJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    const data = jwt.verify(token, secret);
    if (!data) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }

    req.data = data;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = { validateJWT };
