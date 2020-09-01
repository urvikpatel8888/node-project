const { User, Users, profiles, profilegroup } = require('../core/connection');
var express = require('express');
var app = express();
var Sequelize = require('sequelize');

/* GET User */
exports.getuser = (req, res) => {
    User.findAll()
        .then(users => {
            res.send(users);
        });
}

/* GET Users */
exports.getusers = (req, res) => {
    Users.findAll()
        .then(users => {
            res.send(users);
        });
}

/* GET User By Id */
exports.getUserById = (req, res) => {
    User.findOne({ where: { id: req.params.id }})
        .then(users => {
            res.send(users);
        });
}

/* GET Users By Id */
exports.getUsersById = (req, res) => {
    Users.findOne({ where: { id: req.params.id }})
        .then(users => {
            res.send(users);
        });
}

/* Add User */
exports.addUser = (req, res) => {
    User.create(req.body)
        .then(users => {
            res.send(users);
        });
}

/* Update User */
exports.updateUser = (req, res) => {
    User.update( req.body , { where : { id : req.params.id }}).then(user => {
        res.send(user)
    })
}

/* Delete User */
exports.deleteUser = (req, res) => {
    User.destroy({ where : { id : req.params.id }}).then(user => {
        res.send(user)
    })
}

/* Association belongsTo GET */
exports.belongsToGet = (req, res) => {
        User.findOne({
            where: {id : req.params.id},
            include: [
                { model: Users},
                ]
        })  
        .then(user => {
            res.send(user);
        })
}

/* Association belongsTo POST */
exports.belongsToPost = async (req, res) => {
    try{
        const newdata = await User.create({
            id: req.body.id,
            name: req.body.name,
            number: req.body.number,
            email: req.body.email,
            address: req.body.address,
            allId: req.body.allId
        });
        const newdataId = newdata.id;
        await Users.create({
            id: newdataId,
            allId: req.body.userdatum.allId,
            name: req.body.userdatum.name,
            address: req.body.userdatum.address
        })
        res.send("Success - for Show use /belongsTo/:id and get");
    }
    catch(error){
        console.log(error);
        res.status(500);
    }
}

/* Association belongsTo PUT */
exports.belongsToPut = async (req, res) => {
    try{
        const newdata = await User.update(req.body, {
            where: { id: req.params.id }
        });
        await Users.update(req.body.userdatum, {
            where: { id: req.params.id }
        })
        res.send("Success - for Show use /belongsTo/:id and put");
    }
    catch(error){
        console.log(error);
        res.status(500);
    }
}

/* Association belongsTo DELETE */
exports.belongsToDelete = async (req, res) => {    
    try{
        const newdata = await User.destroy({
            where: { id: req.params.id }
        });
        await Users.destroy({
            where: { id: req.params.id }
        })
        res.send("Success - for Show use /belongsTo/:id and get");
    }
    catch(error){
        console.log(error);
        res.status(500);
    }
}

/* Association hasOne GET */
exports.hasOneGet = (req, res) => {
    User.findOne({
         where: {id : req.params.id},
         include: [
             { model: Users},
            ]
    })  
    .then(user => {
        res.send(user);
    })
}

/* Association - hasOne POST */
exports.hasOnePost = async (req, res) => {
    try{
        const newdata = await User.create({
            id: req.body.id,
            name: req.body.name,
            number: req.body.number,
            email: req.body.email,
            address: req.body.address,
            allId: req.body.allId
        });
        const newdataId = newdata.id;
        await Users.create({
            id: newdataId,
            allId: req.body.userdatum.allId,
            name: req.body.userdatum.name,
            address: req.body.userdatum.address
        })
        res.send("Success - for Show use /hasone/:id and get");
    }
    catch(error){
        console.log(error);
        res.status(500);
    }
}

/* Association - hasOne PUT */
exports.hasOnePut = async (req, res) => {
    try{
        const newdata = await User.update({
            id: req.body.id,
            name: req.body.name,
            number: req.body.number,
            email: req.body.email,
            address: req.body.address,
            allId: req.body.allId
        }, {
            where: { id: req.params.id }
        });
        const newdataId = newdata.id;
        await Users.update({
            id: newdataId,
            allId: req.body.userdatum.allId,
            name: req.body.userdatum.name,
            address: req.body.userdatum.address
        }, {
            where: { id: req.params.userId }
        })
        res.send("Success - for Show use /hasone/:id and get");
    }
    catch(error){
        console.log(error);
        res.status(500);
    }
}

/* Association belongsTo DELETE */
exports.hasOneDelete = async (req, res) => {    
    try{
        const newdata = await User.destroy({
            where: { id: req.params.id }
        });
        await Users.destroy({
            where: { id: req.params.id }
        })
        res.send("Success - for Show use /belongsTo/:id and get");
    }
    catch(error){
        console.log(error);
        res.status(500);
    }
}

/* Association hasMany GET */
exports.hasManyGet = (req, res) => {
    User.findAll({ include: [Users] })
    .then(user => {
        res.send(user);
    })
}

/* Association belongsToMany GET USERS */
exports.belongsToManyGetUsers = (req, res) => {
    Users.findAll({ include: [User] })
    .then(user => {
        res.send(user);
    })
}

/* Association belongsToMany POST USERS */
exports.belongsToManyPostUsers = async (req, res) => {
    try{
        await Users.create({
            id: req.body.id,
            name: req.body.name,
            address: req.body.address,
            allId: req.body.allId
        });
        req.body.users.forEach(user => {
            const data = {
                id: user.id,
                allId: user.allId,
                name: user.name,
                number: user.number,
                email: user.email,
                address: user.address
            }
            const all = {
                userdatumId: req.body.id,
                userId: user.id
            }
            User.create(data, { w: 1 }, { returning : true });
            user_userdata_mapping.create(all, { w: 1 }, { returning : true });
        });        
        res.send("Success - for Show use /belongsTo/:id and get");
    }
    catch(error){
        console.log(error);
        res.status(500);
    }
}

/* Association belongsToMany PUT USERS */
exports.belongsToManyPutUsers = async (req, res) => {
    try{
        await Users.update(req.body, {
            where: { id : req.params.id }
        });
        req.body.users.forEach(user => {
            const all = {
                userdatumId: req.body.id,
                userId: user.id
            }
            User.update(user, { where: { id: user.id }}, { w: 1 }, { returning : true });
            user_userdata_mapping.update(all, { where: { id: user.user_userdata_mapping.id }}, { w: 1 }, { returning : true });
        });        
        res.send("Success - for Show use /belongsTo/:id and get");
    }
    catch(error){
        console.log(error);
        res.status(500);
    }
}

/* Association belongsToMany DELETE Users */
exports.belongsToManyDeleteUsers = async (req, res) => {
    try{
        await Users.destroy({
            where: { id: req.params.id }
        });
        await User.destroy({
            where: { id: req.params.usersId }
        });
        res.send("Success - for Show use /belongsToMany/user/:id and get");
    }
    catch(error){
        console.log(error);
        res.status(500);
    }
}

/* Association belongsToMany GET USERS */
exports.belongsToManyGetUser = (req, res) => {
    User.findAll({ include: [Users] })
    .then(user => {
        res.send(user);
    })    
}

exports.getList = (req, res) => {
    const { id } = req.params;
    profiles.findAll({ where : {
            emp_position_code: id
        },
        // include: [profileGroup]
    })
    .then(profiles => {
        return res.send(profiles);
    })
}

exports.getprofile = async (req, res) => {
    const { empId, profileId } = req.params

        var profile = await profiles.findOne(profileId)
        profile = JSON.parse(JSON.stringify(profile))
        if(!profile){
            profile = {};
        } else {
            if(profile.emp_position_code !== +empId){
                return res.status(401).send({ message: "You are not authorized to view this profile." })
            }
        }
        return res.send(profile)
}

exports.updateProfile = async (req, res) => {
    const { empId, profileId } = req.params

        var profile = await profiles.findByPk(profileId)
        var groupId = profile.group_id

        profilegroup.findByPk(groupId, { include: ['profiles']})
        .then (async p1 => {
            
            if(req.body.status == 0){
                return res.status(200).send({message: "Status is already updated"});
            }else if(req.body.status == 1 || req.body.status == 2){
                
                for(i=0; i<p1.profiles.length; i++){
                    if(p1.profiles[i].status == 0){
                        flag = 0
                    }

                    if(p1.profiles[i].status == 1){
                        if(p1.profiles[i].status == 1 && req.body.status == 1){
                            if(p1.profiles[i].cegedim_customer_id_x.toLowerCase() == p1.profiles[i].cegedim_customer_id_y.toLowerCase() &&
                                p1.profiles[i].doctor_name_x.toLowerCase() == p1.profiles[i].doctor_name_y.toLowerCase() &&
                                p1.profiles[i].speciality_desc_x.toLowerCase() == p1.profiles[i].speciality_desc_y.toLowerCase() &&
                                p1.profiles[i].locality_x.toLowerCase() == p1.profiles[i].locality_y.toLowerCase() &&
                                p1.profiles[i].city_x.toLowerCase() == p1.profiles[i].city_y.toLowerCase() &&
                                p1.profiles[i].postal_area_x.toLowerCase() == p1.profiles[i].postal_area_y.toLowerCase() &&
                                p1.profiles[i].pincode_x.toLowerCase() == p1.profiles[i].pincode_y.toLowerCase() &&
                                p1.profiles[i].district_x_name.toLowerCase() == p1.profiles[i].district_y_name.toLowerCase() &&
                                p1.profiles[i].state_x.toLowerCase() == p1.profiles[i].state_y.toLowerCase() &&
                                p1.profiles[i].email_address_x.toLowerCase() == p1.profiles[i].email_address_y.toLowerCase() &&
                                p1.profiles[i].phone_number_x.toLowerCase() == p1.profiles[i].phone_number_y.toLowerCase() &&
                                p1.profiles[i].registration_number_x.toLowerCase() == p1.profiles[i].registration_number_y.toLowerCase() &&
                                p1.profiles[i].images_x.toLowerCase() == p1.profiles[i].images_y.toLowerCase() &&
                                p1.profiles[i].location_x.toLowerCase() == p1.profiles[i].location_x.toLowerCase())
                            {
                                p1.update({ status : 1 })
                                flag = 1
                            }
                            else{
                                p1.update({ status : 3 })
                                flag = 3
                            }
                        }
                    }                    

                    if(p1.profiles[i].status == 2){
                            p1.update({ status : 2 })
                            flag = 2
                    }
                }
                if(flag == 0){
                    return res.send("Status is 0")
                }else{
                    return res.send(p1)                    
                }
                
            }else{
                return res.status(200).send({message: "No Status found in req.body"})
            }
        })
}