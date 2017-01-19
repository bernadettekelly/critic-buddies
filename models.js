const mongoose = require('mongoose');

const blogPostSchema = mongoose.Schema({
	movieTitle: {type: String},
	text: {type: String},
	publishedOn: {type: Date, default: Date.now},
	name: {
		firstName: String,
		lastName: String
	}
});

movieReviewsSchema.virtual('fullName').get(function() {
	return `${this.name.firstName} ${this.author.lastName}`.trim();
});

movieReviewsSchema.methods.apiRepr = function() {
	return {
		id: this._id,
		name: this.fullName,
		text: this.text,
		publishedOn: this.publishedOn
	};
}

const movieReviews = mongoose.model('movieReviews', movieReviews);

module.exports = {movieReviews};