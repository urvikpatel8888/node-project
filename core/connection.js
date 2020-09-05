const Sequelize = require('sequelize');
require('dotenv').config();
var config = require('../config/database.json');
const UserModel = require('../db/models/user');
const UsersModel = require('../db/models/subuser');
const UserProfile = require('../db/models/userProfile');
const regUser = require('../db/models/login');
const profile = require('../db/models/profiles');
const profilesgroup = require('../db/models/profilegroup');
const profilesmaster = require('../db/models/profilemaster');

config = config[process.env.NODE_ENV];
if(!config){
    console.log("Invalid Database Configuration");
}
console.log(config);
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
    logging: config.logging,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        freezeTableName: true
    }
  });

  sequelize
  .authenticate()
  .then(() => {
      console.log("Connection has been established successfully. ")
  })
  .catch(err => {
    console.log("Unable to connect to the database:", err)
  });


  const User = UserModel(sequelize, Sequelize);
  const Users = UsersModel(sequelize, Sequelize);
  const user_userdata_mapping = UserProfile(sequelize, Sequelize);
  const newlogin = regUser(sequelize, Sequelize);
  const profiles = profile(sequelize, Sequelize);
  const profilegroup = profilesgroup(sequelize, Sequelize);
  const profilemaster = profilesmaster(sequelize, Sequelize);

  
  Users.hasOne(User, { foreignKey: 'allId' });
  User.belongsTo(Users, { foreignKey: 'allId' , targetKey: 'allId' });
  Users.hasMany(User, { foreignKey: 'allId' });
  Users.belongsToMany(User, { through: user_userdata_mapping });
  User.belongsToMany(Users, { through: user_userdata_mapping });

  profiles.belongsTo(profilegroup, {
    foreignKey: 'group_id', as: 'group'
  });
// console.log(profiles);

  profilegroup.hasMany(profiles, {
    foreignKey: 'group_id', as: 'profiles'
  })
  // console.log(profiles);
  // console.log(profilesgroup);
//   framework = {connection : sequelize};
  
  sequelize.sync();

  module.exports = {
        sequelize, User, Users, user_userdata_mapping, newlogin, profiles, profilegroup, profilemaster
  }