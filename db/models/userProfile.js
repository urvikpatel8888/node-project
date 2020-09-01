
const Sequelize = require('sequelize');

module.exports  = (sequelize, type) => {
    return sequelize.define('user_userdata_mapping', {
        id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      }
    })
}