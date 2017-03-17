const bcrypt = require('bcryptjs');
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
    	type: String
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
	return bcrypt.compare(password, this.password)
}

UserSchema.statics.hashPassword = function(password) {
	return bcrypt.hash(password, 10)
}

const User = mongoose.model('userdatas', UserSchema);

module.exports = {User};