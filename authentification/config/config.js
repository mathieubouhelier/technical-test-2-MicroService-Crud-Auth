const dotenv = require('dotenv');
dotenv.config({ path: './../.env' });

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'auth_gptw',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'auth_gptw',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'auth_gptw',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
