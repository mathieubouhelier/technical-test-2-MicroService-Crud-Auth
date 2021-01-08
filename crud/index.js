const express = require('express');
const controllers = require('./controllers');
const app = express();
const PORTCRUD = process.env.PORTCRUD || 3001;
app.use(express.json());
app.use('/product', controllers.productController);

app.use((error, _req, res, _next) => {
  const { message, status } = error;

  res.status(500).send({ message });
});

app.listen(PORTCRUD, () => console.log(`ouvindo na porta ${PORTCRUD}!`));

