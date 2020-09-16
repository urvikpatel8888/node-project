const { User, Users, profiles, profilegroup, profilemaster, unique_profile } = require('../core/connection');
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

        var profile = await profiles.findByPk(profileId)
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
    // var profile =await profiles.findOne(profileId);
    profiles.update( req.body , { where : { id : req.params.profileId }})
    .then(user => {
        res.send("Success");
    })
}

// exports.updateGroup = async (req, res) => {
//     // var profile =await profiles.findOne(profileId);
//     profilegroup.update( req.body , { where : { id : req.params.profileId }})
//     .then(user => {
//         res.send("Success");
//     })
// }

// exports.updateProfiles = async (req, res) => {
//         const { empId, profileId } = req.params
//     await profiles.findAll()
//     .then(user => {
//         res.send(user);
//     })
//     // profilegroup.update( req.body , { where : { id : req.params.profileId }})
//     // .then(user => {
//     //     res.send("Success");
//     // })

// }

// exports.updateProfiles = async (req, res) => {
//     const { empId, profileId } = req.params
// await profiles.findByPk(profileId)
// .then(user => {
//     res.send(user);
// })
// // profilegroup.update( req.body , { where : { id : req.params.profileId }})
// // .then(user => {
// //     res.send("Success");
// // })
// }

exports.updateProfiles = async (req, res) => {
    const { empId, profileId } = req.params
        var profile = await profiles.findByPk(profileId)
        var groupId = profile.group_id
        var data = await profiles.findOne({
            where: { id: profileId }
        })
        if(data.status == 0){
            profilegroup.findByPk(groupId, { include: ['profiles']})
            .then (async result => {
                let count = 0;
                if(req.body.status == 0){
                    return res.status(400).send({message: "Invalid Request"});
                }
                
                else if(req.body.status == 1 || req.body.status == 2){    
                    
                    for(i=0; i<result.profiles.length; i++){
                        if(result.profiles[i].id == data.id){
                            continue;
                        }
                        if(result.profiles[i].status == 0){
                            flag = 0;
                            break;
                        }else{
                            if(result.profiles[i].status == 1){
                                if(result.profiles[i].status == 1 && req.body.status == 1){
                                    count++;
                                    flag = 1;   
                                }
                                else{
                                    //profile status = 1 and req.body.status = 2;
                                    if(req.body.reason != undefined || req.body.reason != null || req.body.reason != ''){
                                        var addressObj = JSON.parse(JSON.stringify(req.body.address))
                                        result.update({
                                            status : 2
                                        });
                                        flag = 2;
                                        break;
                                    }else{
                                        return res.status(400).send({ message: "No reason found." })    
                                    }
                                }
                            }                    
                            if(result.profiles[i].status == 2 || req.body.status == 2){
                                if(req.body.reason != undefined || req.body.reason != null || req.body.reason != ''){
                                    //any status is 2 but if any status is 0 then no changes
                                    result.update({ 
                                        status : 2,
                                    });
                                    flag = 2;
                                }else{
                                    return res.status(400).send({ message: "No reason found." })
                                }
                                
                            }
                        }
                    }
                    if(flag == 0){
                        profiles.update({
                            status : req.body.status
                        },{ where: { id : profileId }});
                    }
                    if(flag == 1){
                        if(count == result.profiles.length-1){
                            var uniqueProfiles = [];
                            var map = new Map();
                            for (item of result.profiles) {
                                if(!map.has(item.cegedim_customer_id_x)){
                                    map.set(item.cegedim_customer_id_x, true);    // set any value to Map
                                    uniqueProfiles.push({
                                        cegedim_customer_id: item.cegedim_customer_id_x,
                                        doctor_name : item.doctor_name_x,
                                        speciality_desc: item.speciality_desc_x,
                                        locality: item.locality_x,
                                        city: item.city_x,
                                        postal_area: item.postal_area_x,
                                        pincode: item.pincode_x,
                                        district_name: item.district_x_name,
                                        state: item.state_x
                                    });
                                }
                                if(!map.has(item.cegedim_customer_id_y)){
                                    map.set(item.cegedim_customer_id_y, true);    // set any value to Map
                                    uniqueProfiles.push({
                                        cegedim_customer_id: item.cegedim_customer_id_y,
                                        doctor_name : item.doctor_name_y,
                                        speciality_desc: item.speciality_desc_y,
                                        locality: item.locality_y,
                                        city: item.city_y,
                                        postal_area: item.postal_area_y,
                                        pincode: item.pincode_y,
                                        district_name: item.district_name_y,
                                        state: item.state_y
                                    });
                                }
                            }
                            // console.log("unique arr", uniqueProfiles);
                            var tempProf = {};
                            var flag = 0;
                            var temp = {};
                            if((temp.doctor_name == undefined || temp.doctor_name == null) ||
                            (temp.speciality_desc == undefined || temp.speciality_desc == null) ||
                            (temp.locality == undefined || temp.locality == null) ||
                            (temp.city == undefined || temp.city == null) ||
                            (temp.postal_area == undefined || temp.postal_area == null) ||
                            (temp.pincode == undefined || temp.pincode == null) ||
                            (temp.district_name == undefined || temp.district_name == null) ||
                            (temp.state == undefined || temp.state == null)
                            ){
                                for(i=0; i<uniqueProfiles.length-1; i++){
                                    if(temp.doctor_name == undefined || temp.doctor_name == null){
                                        temp.doctor_name = uniqueProfiles[i].doctor_name;
                                    }
                                    if(temp.speciality_desc == undefined || temp.speciality_desc == null){
                                        temp.speciality_desc = uniqueProfiles[i].speciality_desc;
                                    }
                                    if(temp.locality == undefined || temp.locality == null){
                                        temp.locality = uniqueProfiles[i].locality;
                                    }
                                    if(temp.city == undefined || temp.city == null){
                                        temp.city = uniqueProfiles[i].city;
                                    }
                                    if(temp.postal_area == undefined || temp.postal_area == null){
                                        temp.postal_area = uniqueProfiles[i].postal_area;
                                    }
                                    if(temp.pincode == undefined || temp.pincode == null){
                                        temp.pincode = uniqueProfiles[i].pincode;
                                    }
                                    if(temp.district_name == undefined || temp.district_name == null){
                                        temp.district_name = uniqueProfiles[i].district_name;
                                    }
                                    if(temp.state == undefined || temp.state == null){
                                        temp.state = uniqueProfiles[i].state;
                                    }
                                }
                            }
                            for(i=0; i<uniqueProfiles.length; i++){
                                if((uniqueProfiles[i].doctor_name == undefined || uniqueProfiles[i].doctor_name == null || uniqueProfiles[i].doctor_name.toLowerCase() == temp.doctor_name.toLowerCase()) &&
                                    (uniqueProfiles[i].speciality_desc == undefined || uniqueProfiles[i].speciality_desc == null || uniqueProfiles[i].speciality_desc.toLowerCase() == temp.speciality_desc.toLowerCase()) &&
                                    (uniqueProfiles[i].locality == undefined || uniqueProfiles[i].locality == null || uniqueProfiles[i].locality.toLowerCase() == temp.locality.toLowerCase()) &&
                                    (uniqueProfiles[i].pincode == undefined || uniqueProfiles[i].pincode == null || uniqueProfiles[i].pincode.toLowerCase() == temp.pincode.toLowerCase()) &&
                                    (uniqueProfiles[i].city == undefined || uniqueProfiles[i].city == null || uniqueProfiles[i].city.toLowerCase() == temp.city.toLowerCase()) &&
                                    (uniqueProfiles[i].postal_area == undefined || uniqueProfiles[i].postal_area == null || uniqueProfiles[i].postal_area.toLowerCase() == temp.postal_area.toLowerCase()) &&
                                    (uniqueProfiles[i].district_name == undefined || uniqueProfiles[i].district_name == null || uniqueProfiles[i].district_name.toLowerCase() == temp.district_name.toLowerCase()) &&
                                    (uniqueProfiles[i].state == undefined || uniqueProfiles[i].state == null || uniqueProfiles[i].state.toLowerCase() == temp.state.toLowerCase())
                                ){
                                    // console.log("city", temp.city);
                                    tempProf.doctor_name = temp.doctor_name;
                                    tempProf.speciality_desc = temp.speciality_desc;
                                    tempProf.locality = temp.locality;
                                    tempProf.city = temp.city;
                                    tempProf.postal_area = temp.postal_area;
                                    tempProf.pincode = temp.pincode;
                                    tempProf.district_name = temp.district_name;
                                    tempProf.state = temp.state;
                                    console.log("Success");
                                    status_flag = 1;
                                }else{
                                    console.log("Not done");
                                    status_flag = 3; 
                                    break;
                                }  
                            }
                            if(status_flag == 1){
                                result.update({ status : 1 });
                                profiles.update({
                                    status : req.body.status
                                },{ where: { id : profileId }});
                            }
                            if(status_flag == 3){
                                result.update({ status : 3 });
                                profiles.update({
                                    status : req.body.status
                                    },{ where: { id : profileId }});
                            }
                        }
                    }
                    if(flag == 2){
                        profiles.update({
                            status : req.body.status,
                            reason: req.body.reason,
                            },{ where: { id : profileId }});
                    }

                    // console.log("unnique Profiles: ", tempProf);
                    unique_profile.create(tempProf);
                    for(i=0; i<result.profiles.length; i++){
                        if(result.profiles[i].cegedim_customer_id_x == result.profiles[i].emp_position_code){
                            var addressObj = JSON.parse(JSON.stringify(req.body.address))
                            if(result.profiles[i].address_x.address == undefined || result.profiles[i].address_x.address == null){
                                profiles.update({
                                address_x: addressObj
                                },{ where: { cegedim_customer_id_x : req.body.cegedim_customer_id_x, emp_position_code: empId }});
                            }
                        }
                    }
                    return res.send(result);
                }else{
                    return res.status(200).send({message: "No Status found in req.body"})
                }
            })
        }
        else{
            return res.status(400).send({message: "Invalid update request"});
        }
}