const Sequelize = require('sequelize');

module.exports  = (sequelize, type) => {
    return sequelize.define('userdata', {
        // id: type.number,
        allId: type.INTEGER,
        name: type.STRING,
        address: type.STRING,
    })
}