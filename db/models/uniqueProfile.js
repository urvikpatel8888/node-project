// 'use strict';
// const {
//   Model
// } 
const Sequelize = require('sequelize');
// const Profiles = require('./profiles');
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('unique_profile', {
    doctor_name: DataTypes.STRING(216),
    speciality_desc: DataTypes.STRING(216),
    locality: DataTypes.STRING(256),
    city: DataTypes.STRING(64),
    postal_area: DataTypes.STRING(16),
    pincode: DataTypes.STRING(16),
    district_name: DataTypes.STRING(64),
    state: DataTypes.STRING(64),
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