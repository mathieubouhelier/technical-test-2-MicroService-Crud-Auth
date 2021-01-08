const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().integer().required(),
});

// Check if product create request contain correct data
const productDataValidation = async (req, res, next) => {
  const { name, price } = req.body;
  const { error } = schema.validate({ name, price  });
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

module.exports = {
  productDataValidation,
};
