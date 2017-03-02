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
// '/users/login'

router.post('/', (req, res) => {
	if (!req.body) {
		return res.status(400).json({message: 'Nothing in body'});
	}
	if (!('username' in req.body)) {
		return res.status(422).json({message: 'Missing field: username'});
	}
	let {username, password, firstName, lastName} = req.body;
	
	if (typeof username !== 'string') {
		return res.status(422).json({message: 'Invalid username'});
	}
    if (!('password' in req.body)) {
		return res.status(422).json({message: 'Missing field: password'});
	}
    if (typeof password !== 'string') {
		return res.status(422).json({message: 'Invalid password'});
	}

	return User
		.find({username})
		.count()
		.exec()
		.then(count => {
			if (count > 0) {
				return res.status(422).json({message: 'Username is already taken'});
			}
			return User.hashPassword(password)
		})
		.then(hash => {
			return User
				.create({
					username: username,
					password: hash,
					firstName: firstName,
                    lastName: lastName
				})
		    })
		.then(user => {
			return res.status(201).json(user.apiRepr());
		})
		.catch(err => {
			return res.status(500).json({message: 'Internal server error:' + err})
		});
});

    router.post('/login', function (req, res) {
    	var username = req.body.username;
    	var password = req.body.password;
    	console.log(username, password);
    	//var userId = req.session.userId;
    	User.findOne({username: username}, function (err, user) {
    		console.log(user);
    		if(err) {
    			console.log(err);
    			return res.status(500).send();
    		}
    		if(!user) {
    			return res.status(404).send('No user found');
    		}
    		if(!user.validatePassword(password)){
    			return res.status(500).send();
    		}
    		req.session.userId = user._id;
    		return res.status(200).send(user.apiRepr());
    	})
    	});   


    router.delete('/logout', function (req, res) {
    	req.session.destroy();
    	res.send("Successful logout");
    });

    router.get('/', function (req, res) {
    	if(req.session.userId) {
    		res.status(200).json(req.session);
    	}
    	else {
    		res.status(500).send('No session available');
    	}
    }); 

//	passport.use(login);
//router.use(passport.initialize());

module.exports = router;

    //log in and log out?