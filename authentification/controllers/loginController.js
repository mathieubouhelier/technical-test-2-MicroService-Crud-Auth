const express = require('express');
const { User } = require('../models');
const nodemailer = require('nodemailer');

const router = express.Router();
const userValidation = require('../middlewares/userValidation');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'testegptw@gmail.com',
    pass: '14!gklwp54',
  },
});

router.post('/', userValidation.loginDataValidation, async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailFromDB = await User.findOne({ where: { email } });

    if (!emailFromDB || emailFromDB.password !== password) {
      return res.status(400).json({ message: 'Campos inválidos' });
    }

    const authNumber = Math.floor(Math.random() * 8999) + 1000;
    const newUser = await User.update(
      { authNumber },
      {
        where: { email },
      },
    );
    const mailOptions = {
      from: 'testegptw@gmail.com',
      to: email,
      subject: 'Sending Email using Node.js',
      text: `seu codigo é ${authNumber}`,
    };

    // module to send email

    // transporter.sendMail(mailOptions, function(error, info){
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //   }
    // });
    return res.status(200).send({ message: 'Email e senha validos' });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: 'Erro ao logar o usuário no banco' });
  }
});

module.exports = router;
