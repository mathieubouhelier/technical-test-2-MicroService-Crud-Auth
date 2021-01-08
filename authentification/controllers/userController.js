const express = require('express');
const { User } = require('../models');
const createToken = require('../auth/createJWT');
const { validateJWT } = require('../auth/validateJWT');


const router = express.Router();
const userValidation = require('../middlewares/userValidation');

router.post(
  '/',
  userValidation.userDataValidation,
  userValidation.emailAlreadyExist, 
  async (req, res) => {
    try {
      const { displayName, email, password, authNumber } = req.body;
      const emailFromDB = await User.create({
        displayName,
        email,
        password,
        authNumber,
      });
      const { password: _, ...userWithoutPassword } = emailFromDB;
      const token = await createToken(userWithoutPassword);
      return res.status(201).json({ token });
    } catch (e) {
      console.log(e.message);
      res.status(500).send({ message: 'Erro ao salvar o usuário no banco' });
    }
  },
);

router.get(
  '/',
  validateJWT,
  async (req, res) => {
    const users = await User.findAll();
    res.status(200).json(users);
  },
);

module.exports = router;
