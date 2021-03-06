// 'use strict';
// const {
//   Model
// } 
const Sequelize = require('sequelize');
// const Profiles = require('./profiles');
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('profilegroup', {
    status: DataTypes.INTEGER,
    created_at: {
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      type: DataTypes.DATE
    },
    updated_at: {
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      type: DataTypes.DATE
    }
  }, {
    // sequelize,
    // modelName: 'profilegroup',
    timestamps: false,
    underscored: true
  });
  // ProfileGroup.associate = function(models){
  //   ProfileGroup.hasMany(models.profiles, {
  //     foreignKey: 'group_id', 
  //     as: 'profiles' 
  //   })
  // }
  // return ProfileGroup;
};