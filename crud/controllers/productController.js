const { Op } = require('sequelize');
const rescue = require('express-rescue');
const express = require('express');
const { Products } = require('../models');
const { validateJWT } = require('../auth/validateJWT');

const router = express.Router();
const productValidation = require('../middlewares/productValidation');

router.post(
  '/',
  validateJWT,
  productValidation.productDataValidation,
  rescue(async (req, res) => {
    const { name, price } = req.body;
    const product = { name, price };
    const createdProduct = await Products.create(product);
    return res.status(201).json(createdProduct);
  }),
);

router.get(
  '/',
  validateJWT,
  rescue(async (req, res) => {
    const products = await Products.findAll();
    res.status(200).json(products);
  }),
);

router.get(
  '/:id',
  validateJWT,
  rescue(async (req, res) => {
    const id = req.params.id;
    const product = await Products.findOne({ where: { id } });
    if (product === null) {
      res.status(404).json({ message: 'Post não existe' });
    }
    res.status(200).json(product);
  }),
);

router.put(
  '/:id',
  validateJWT,
  productValidation.productDataValidation,
  rescue(async (req, res) => {
    const { name, price } = req.body;
    const productData = { name, price };

    const id = req.params.id;
    const product = await Products.findOne({ where: { id } });

    if (!product) {
      return res.status(401).json({ message: 'Produto não encontrado' });
    }
    await Products.update(productData, {
      where: { id },
    });
    const updatedProduct = await Products.findOne({ where: { id } });
    return res.status(200).json(updatedProduct);
  }),
);

router.delete(
  '/:id',
  validateJWT,
  rescue(async (req, res) => {
    const id = req.params.id;
    const product = await Products.findOne({ where: { id } });
    if (!product) {
      return res.status(404).json({ message: 'Produto não existe' });
    }
    await Products.destroy({
      where: { id },
    });

    return res.status(205).json({ message: 'Produto excluído com sucesso' });
  }),
);

module.exports = router;
