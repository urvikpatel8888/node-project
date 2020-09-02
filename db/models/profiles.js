// 'use strict';
// const {
//   Model
// } = require('sequelize');
const Sequelize = require('sequelize');
// const ProfileGroup = require('./profilegroup')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('profiles', {
    state_name: DataTypes.STRING(64),
    emp_position_code: DataTypes.INTEGER,
    emp_division: DataTypes.STRING(64),
    emp_hq_id: DataTypes.INTEGER,
    emp_hq_name: DataTypes.STRING(64),
    cegedim_customer_id_x: DataTypes.STRING(64),
    doctor_name_x: DataTypes.STRING(216),
    speciality_desc_x: DataTypes.STRING(216),
    locality_x: DataTypes.STRING(256),
    city_x: DataTypes.STRING(64),
    postal_area_x: DataTypes.STRING(16),
    pincode_x: DataTypes.STRING(16),
    district_x_name: DataTypes.STRING(64),
    state_x: DataTypes.STRING(64),
    email_address_x: {
      type: DataTypes.STRING(216)
    },
    phone_number_x: {
      type: DataTypes.STRING(64)
    },
    registration_number_x: {
      type: DataTypes.STRING(216)
    },
    images_x: DataTypes.TEXT,
    location_x: DataTypes.STRING(256),
    cegedim_customer_id_y: DataTypes.STRING(64),
    doctor_name_y: DataTypes.STRING(216),
    speciality_desc_y: DataTypes.STRING(216),
    locality_y: DataTypes.STRING(256),
    city_y: DataTypes.STRING(64),
    postal_area_y: DataTypes.STRING(16),
    pincode_y: DataTypes.STRING(16),
    district_name_y: DataTypes.STRING(64),
    state_y: DataTypes.STRING(64),
    email_address_y: {
      type: DataTypes.STRING(216)
    },
    phone_number_y: {
      type: DataTypes.STRING(64)
    },
    registration_number_y: {
      type: DataTypes.STRING(216)
    },
    status: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    reason: {type: DataTypes.STRING(256), allowNull: true, defaultValue: ""},
    group_id: DataTypes.INTEGER,
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
    // modelName: 'processed_profiles',
    timestamps: false,
    underscored: true
  });
  // console.log(framework.connection.models.ProfileGroup);
  // Profiles.associate = function(models){
  //   Profiles.belongsTo(models.profilegroup,{
  //     foreignKey: 'group_id', 
  //     as: 'group'
  //   })
  // }
  // return Profiles;
};