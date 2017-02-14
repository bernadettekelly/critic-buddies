const {login} = require('passport-http');
const express = require('express');
const jsonParser = require('body-parser').json();
const passport = require('passport');

const {User} = require('./UsersModels');

const router = express.Router();

router.use(jsonParser);

const login = new login(
	(username, password, cb) => {
		User
		.findOne({username})
		.exec()
		.then(user => {
			if (!user) {
				return cb(null, false, {
					message: 'Invalid username'
				});
			}
			if (user.password !== password) {
				return cb(null, false, 'Invalid password');
			}
			return cb(null, user);
		})
		.catch(err => cb(err))
	});

passport.use(login);

router.post('/', (req, res) => {
	if (!req.body) {
		return res.status(400).json({message: 'Nothing in body'});
	}
	if (!('username' in req.body)) {
		return.status(422.json({message: 'Missing field: username'});
	}
	let {username, password} = req.body;
	
	if (typeof username !== 'string') {
		return res.status(422).json({message: 'Invalid username'});
	}
    if (!('password' in req.body)) {
		return.status(422.json({message: 'Missing field: password'});
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
				return.status(422).json({message: 'Username is already taken'});
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
			return.status(201).json(user.apiRepr());
		})
		.catch)err => {
			return.status(500).json({message: 'Internal server error'})
		}};
});

    //router.delete to logout?