var jwt = require('jsonwebtoken');
var express = require('express');
var app = express();
var config = require('../config/config.js');
require('../db/models/login');
app.set('superSecret', config.secret);
var Sequelize = require('sequelize');
const { User, Users, newlogin } = require('../core/connection');

exports.regUser = (req, res) => {
    const data = {
        name: req.body.name,
        number: req.body.number,
        email: req.body.email,
        password: req.body.password
    }
    newlogin.create(data)
        .then(data => res.status(201).json({
            message: 'New User has been created.'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
};

exports.loginCheck = (req, res) => {
const email = req.body.email;
const password = req.body.password;
    newlogin.findOne({
        where: {
            email: email
        }
     }).then((user) => {
        if(user){
            console.log(JSON.stringify(user));
            user.comparePassword(password, (error, response) => {
                if(error) return res.status(401).json(handleUnAuthorizedError);

                if(response) {
                    const payload = {
                        email: email
                    };
                    var token = jwt.sign(payload, app.get('superSecret'), {
                        expiresIn: '1h' // token will expires in 1 hour, you can change from here.
                    });
                    res.json({
                        success: true,
                        message: 'Token Generated!!!!',
                        token: token
                    });
                } else {
                    return res.status(401).json(handleUnAuthorizedError);
                }

            });
        } else {
            res.status(401).json(handleUnAuthorizedError);
        };

    }).catch((error) => res.status(401).json(handleUnAuthorizedError));
};

let handleUnAuthorizedError = {
    success: false,
    message: 'UnAuthorized',
    token: null
}