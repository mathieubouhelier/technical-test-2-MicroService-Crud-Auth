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
    await Products.create(product);
    return res.status(201).json(product);
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

// router.get(
//   '/search',
//   validateJWT,
//   rescue(async (req, res) => {
//     const { q } = req.query;

//     const searchedPost = await Posts.findAll({
//       where: {
//         [Op.or]: [
//           { title: { [Op.like]: `%${q}%` } },
//           { content: { [Op.like]: `%${q}%` } },
//         ],
//       },
//       include: 'user',
//     });

//     return res.status(200).json(searchedPost);
//   }),
// );

// router.get(
//   '/:id',
//   validateJWT,
//   rescue(async (req, res) => {
//     const product = await Posts.findByPk(req.params.id, {
//       include: { model: User, as: 'user' },
//     });
//     if (product === null) {
//       res.status(404).json({ message: 'Post não existe' });
//     }
//     res.status(200).json(product);
//   }),
// );

// router.put(
//   '/:id',
//   validateJWT,
//   blogValidation.blogDataValidation,
//   rescue(async (req, res) => {
//     const { title, content } = req.body;
//     const post = { title, content, userId: req.data.dataValues.id };

//     const userId = req.data.dataValues.id;
//     const product = await Posts.findByPk(req.params.id, {
//       include: { model: User, as: 'user' },
//     });
//     if (userId !== product.userId) {
//       return res.status(401).json({ message: 'Usuário não autorizado' });
//     }
//     await Posts.update(post, {
//       where: { id: req.params.id },
//     });
//     return res.status(200).json(post);
//   }),
// );

// router.delete(
//   '/:id',
//   validateJWT,
//   rescue(async (req, res) => {
//     const userId = req.data.dataValues.id;
//     const product = await Posts.findByPk(req.params.id, {
//       include: { model: User, as: 'user' },
//     });
//     if (product === null) {
//       return res.status(404).json({ message: 'Post não existe' });
//     }
//     if (userId !== product.userId) {
//       return res.status(401).json({ message: 'Usuário não autorizado' });
//     }
//     await Posts.destroy({
//       where: { id: req.params.id },
//     });

//     return res.status(204).json({ message: 'Blog excluído com sucesso' });
//   }),
// );

module.exports = router;
