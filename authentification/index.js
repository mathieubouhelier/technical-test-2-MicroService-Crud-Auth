const express = require('express');
const controllers = require('./controllers');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/login', controllers.loginController);
app.use('/validation', controllers.validationController);
app.use('/user', controllers.userController);

app.use((error, _req, res, _next) => {
  const { message, status } = error;

  res.status(500).send({ message });
});

app.listen(PORT, () => console.log(`ouvindo na porta ${PORT}!`));

