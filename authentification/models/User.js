const createUser = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    authNumber: DataTypes.INTEGER,
  });

  return User;
};

module.exports = createUser;
