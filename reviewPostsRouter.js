const express = require('express');
const router = express.Router();
const {movieReviews} = require('./models')

router.get('/', (req, res) => {
	movieReviews
	.find()
	.exec()
	.then(posts => {
	res.status(200).json({reviewPosts:posts});
})
	.catch(err => {
		console.error(err);
		res.status(500).json({error: 'something went wrong'});
	});
});

router.post('/', (req, res) => {
	const requiredFields = ['movieTitle', 'firstName', 'lastName', 'text'];
	console.log(req.body);
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
        	firstName: req.body.firstName,
        	lastName: req.body.lastName,
        	text: req.body.text,
        	
       })
        .then(movieReviews => res.status(201).json(movieReviews.apiRepr()))
        .catch(err => {
        	console.error(err);
        	res.status(500).json({error: 'Something went wrong'});
        });
});

router.put('/:id', (req, res) => {
    const requiredFields = ['id', 'movieTitle', 'firstName', 'lastName', 'text'];
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
    movieReviews
    .findByIdAndUpdate(req.params.id, {$set: {
        movieTitle: req.body.movieTitle,
        text: req.body.text,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        publishedOn: new Date()
        
    }})

    .then(movieReview =>
    	   		movieReviews.findById(req.params.id)
    	   		 .exec()
    	   		 .then(movieReview => res.status(201).json(movieReview.apiRepr()))
    	  )

    //.exec()
    //.then(movieReviews => res.status(201).json(movieReviews.apiRepr()))
  .catch(err => res.status(500).json({message: 'Internal server error'}));
});


router.delete('/:id', (req, res) => {
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


module.exports = router;