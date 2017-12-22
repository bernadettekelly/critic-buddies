const mongoose = require('mongoose');
var moment = require('moment');
moment().format();

const movieReviewsSchema = mongoose.Schema({
	movieTitle: {type: String},
	text: {type: String},
	publishedOn: {type: Date, default: Date.now},
	firstName: String,
	lastName: String,
	username: String,
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema'}
});

movieReviewsSchema.virtual('fullName').get(function() {
	return `${this.firstName} ${this.lastName}`.trim();
});

movieReviewsSchema.methods.apiRepr = function() {
	return {
		movieTitle: this.movieTitle,
		_id: this._id,
		firstName: this.firstName,
		lastName: this.lastName,
		text: this.text,
		publishedOn: moment(this.publishedOn).format('MMM Do YY')
	};
}

const movieReviews = mongoose.model('movieReviews', movieReviewsSchema);

module.exports = {movieReviews};