'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //bảng Group liên kết với abngr User quan hệ One to Many 
      Group.hasMany(models.User)

      //bảng Group quan hệ với bẳng Role qua bảng Group_Role , quan hệ 1 nhiều
      //1 Group có nhiều Role
      Group.belongsToMany(models.Role, { through: 'Group_Role'})
    }
  }
  Group.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};