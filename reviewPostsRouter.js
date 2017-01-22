const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {movieReviews} = require('./models')
const mongoose = require('mongoose');
const morgan = require('morgan');
const {DATABASE_URL, PORT} = require('./config');

app.use(morgan('common'));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

router.get('/review-posts', (req, res) => {
	movieReviews
	.find()
	.exec()
	.then(posts => {
	res.json(review-posts.map(post => post.apiRepr()));
})
	.catch(err => {
		console.error(err);
		res.status(500).json({error: 'something went wrong'});
	});
});

router.post('/review-posts', jsonParser, (req, res) => {
	const requiredFields = ['movieTitle', 'name', 'text', 'publishedOn'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}
        movieReviews
        .create({
        	movieTitle: req.body.movieTitle,
        	name: req.body.name,
        	text: req.body.text,
        	publishedOn: req.body.publishedOn
       })
        .then(movieReviews => res.status(201).json(movieReviews.apiRepr()))
        .catch(err => {
        	console.error(err);
        	res.status(500).json({error: 'Something went wrong'});
        });
});

///Will comments and comments name show even if they're not required?
router.put('/review-posts/:id', jsonParser, (req, res) => {
	const requiredFields = [
	'id', 'movieTitle', 'name', 'text', 'publishedOn'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
			console.error(message);
			return res.status(400).send(message); 
		}
	}
	if (req.params.id !== req.body.id) {
		const message = (
			`Request path id (${req.params.id}) and request body id `
			`(${req.body.id}) must match`);
		console.log(message);
		return res.status(400).send(message);
	}
	console.log(`Updating review post with id \`${req.params.id}\``);
	const updatedItem = reviewPosts.update({
		id: req.params.id,
		movieTitle: req.body.movieTitle,
		name: req.body.name,
		publishedOn: req.body.publishedOn
	});
	res.status(204).json(updatedItem); 
	});

    movieReviews
    .findByIdAndUpdate(req.params.id, {$set: toUpdate})
    .exec()
    .then(movieReviews => res.status(201).json(movieReviews.apiRepr()))
    .catch(err => res.status(500).json({message: 'Internal server error'}));


router.delete('/reviewPosts/:id', (req, res) => {
	movieReviews
	.findByIdAndRemove(req.params.id)
	.exec()
	.then(() => {
	res.status(204).json({message: 'success'});
})
    .catch(err => {
    	console.error(err);
    	res.status(500).json({error: 'something went wrong'});
    });
});

let server;

function runServer(databaseURL=DATABASE_URL, port=PORT) {
	return new Promise((resolve, reject) => {
		mongoose.connect((databaseUrl, err => {
			if (err) {
				return reject(err);
			}
			server = app.listen(port, () => {
				console.log(`Your app is listening on port ${port}`);
				resolve();
			})
			.on('error', err => {
				mongoose.disconnect();
				reject(err);
		});
	}));
});
}

function closeServer() {
	return mongoose.disconnect().then(() => {
		return new Promise((resolve, reject) => {
			return new Promise((resolve, reject) => {
				console.log('Closing server');
				server.close(err => {
					if (err) {
						return reject(err);
					}
					resolve();
			});
		});
	});
}
if {require.main === module) {
	runServer().catch(err => console.error(err));
);
module.exports = router;