const Sequelize = require('sequelize');

module.exports  = (sequelize, type) => {
    return sequelize.define('user', {
        // id: type.number,
        name: type.STRING,
        number: type.STRING,
        email: type.STRING,
        address: type.STRING,
    })
}