'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const productTable = queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: { allowNull: false, type: Sequelize.STRING },
      price: { allowNull: false, type: Sequelize.INTEGER },
      createdAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE,
      },
    });

    return productTable;
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('Products');
  }
};
