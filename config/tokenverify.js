var jwt = require('jsonwebtoken');
var express = require('express');
var app = express();
var config = require('./config.js');
app.set('superSecret', config.secret);

exports.verifyToken = (req, res, next)=> {

    var token = req.headers['jwt'];
    if (token) {
      jwt.verify(token, app.get('superSecret'), (err, decoded) => {      
        if (err) {
          res.json({ success: false, message: 'Unauthorized!!!' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
        res.status(403).send({ 
          success: false, 
          message: 'No token found with login.' 
      });
    }
  };
