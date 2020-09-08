// 'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const ProfileMaster = sequelize.define('profilemaster', {
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
    address_x: {
      type: DataTypes.JSON(),
      address : DataTypes.STRING(256),
      lat: DataTypes.STRING(64),
      long: DataTypes.STRING(64),
      postal_code: DataTypes.STRING(64)
    },
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
    doctor_name_match:{
      type: DataTypes.STRING(64)
    },
    name_match_score:{
      type: DataTypes.INTEGER
    },
    district_match:{
      type: DataTypes.STRING(16)
    },
    specality_match:{
      type: DataTypes.STRING(16)
    },
    is_processed: { 
      type:  DataTypes.BOOLEAN,
      defaultValue: 0
    },
    error_message: DataTypes.STRING(216),
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
    sequelize,
    modelName: 'master_profiles',
    timestamps: false,
    underscored: true
  });
  return ProfileMaster;
};