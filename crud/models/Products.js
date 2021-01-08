const createProduct = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    'Products',
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
  );


  return Products;
};

module.exports = createProduct;
