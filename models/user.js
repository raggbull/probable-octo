module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    bio: DataTypes.TEXT,
    email: DataTypes.STRING
  });

  User.associate = function(models) {
    User.hasMany(models.Item);
    User.hasMany(models.Collection);
  };

  return User;
};
