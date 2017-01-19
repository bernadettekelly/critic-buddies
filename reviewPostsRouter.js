const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {reviewPosts} = require('./models')

router.get('/', (req, res) => {
	res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
	const requiredFields = ['movieTitle', 'name', 'text', 'publishedOn'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}
	const item = reviewPosts.create(
		req.body.movieTitle, req.body.name, req.body.text, req.body.publishedOn);
	res.status(201).json(item);
});

router.put('/:id', jsonParser, (req, res) => {
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

router.delete('/:id', (req, res) => {
	reviewPosts.delete(req.params.id);
	console.log(`Deleted blog post with id \`$req.params.ID}\``);
	res.status(204).end();
});

module.exports = router;