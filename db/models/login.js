const bcrypt = require("bcrypt");
const DataTypes = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    // console.log(DataTypes);
	const User = sequelize.define('login', {
		user_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
            autoIncrement: true,
            allowNull: false
		},
		name: {
			type: DataTypes.STRING
		},
		number: {
			type: DataTypes.STRING
		},
		email: {
		type: DataTypes.STRING,
			primaryKey: true,
		},
		password: {
			type: DataTypes.STRING
		}
	},{
        instanceMethods:{
            comparePassword: function(password, callback){
                bcrypt.compare(password, this.get('password'), function(err, isMatch) {
                    if (err) return cb(err);
                    callback(null, isMatch);
                  });
            }
        }
    });

	User.beforeCreate((user, options) => {
		return bcrypt.hash(user.password, 10)
			.then(hash => {
				user.password = hash;
			})
			.catch(err => { 
				throw new Error(); 
			});
	})
	return User;
}