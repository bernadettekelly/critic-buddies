const mongoose = require('mongoose');

const movieReviewsSchema = mongoose.Schema({
	movieTitle: {type: String},
	text: {type: String},
	publishedOn: {type: Date, default: Date.now},
	//firstName: String,
	//lastName: String,
	username: String,
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema'}
});

movieReviewsSchema.virtual('fullName').get(function() {
	return `${this.firstName} ${this.lastName}`.trim();
});

movieReviewsSchema.methods.apiRepr = function() {
	return {
		movieTitle: this.movieTitle,
		id: this._id,
		name: this.fullName,
		text: this.text,
		publishedOn: this.publishedOn
	};
}

const movieReviews = mongoose.model('movieReviews', movieReviewsSchema);

module.exports = {movieReviews};