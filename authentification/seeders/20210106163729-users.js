'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          displayName: 'user1',
          email: 'user1@gmail.com',
          password: '123',

        },
        {
          id: 2,
          displayName: 'John Doe',
          email: 'johndoe@gmail.com',
          password: '123456',

        },
      ],
      { timestamps: false },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
