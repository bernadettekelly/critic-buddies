const {login} = require('passport-http');
const express = require('express');
const session = require('express-session');
const jsonParser = require('body-parser').json();
const passport = require('passport');

const {User} = require('./UsersModels');

const router = express.Router();

router.use(jsonParser);

    var auth = function(req, res, next) {
    	if (req.session && req.session.user === "Jane" && req.session.admin)
    		return next();
    	else
    		return res.sendStatus(401);
    };

    router.post('/users', function (req, res) {
    	var username = req.body.username;
    	var password = req.body.password;
    	var userId = req.session.userId;
    	user.findOne({username: username, password: password, userId: userId}, function (err, user) {
    		if(err) {
    			console.log(err);
    			return res.status(500).send();
    		}
    		if(!user) {
    			return res.status(404).send();
    		}
    		return res.status(200).send();
    	})
    	});   


    router.get('/users', function (req, res) {
    	req.session.destroy();
    	res.send("Successful logout");
    });

    router.get('/users', function (req, res) {
    	if(req.session.userId) {
    		resq.session.
    	}
    }); 

	passport.use(login);
router.use(passport.initialize());

module.exports = {router};

    //log in and log out?