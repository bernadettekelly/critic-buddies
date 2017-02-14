const bcrypt = require('bcrypt.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
    password: {
    	required: true,
    	type: string
    },
    firstName: {type: String, default: ""},
    lastName: {type: String, default: ""}
});

UserSchema.methods.apiRepr = function() {
	return {
		username: this.username || '',
		firstName: this.firstName || '',
		lastName: this.lastName || ''
	};
}

UserSchema.methods.validatePassword = function(password) {
	return bcrypt
	.hash(password, 10)
	.then(hash => hash);
}

const User = mongoose.model('User', UserSchema);

module.exports = {User};