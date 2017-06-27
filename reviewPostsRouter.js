const express = require('express');
const router = express.Router();
const {movieReviews} = require('./models')
const {User} = require('./UsersModels');

router.get('/', (req, res) => {
	movieReviews
	.find()
    .sort('-publishedOn')
	.exec()
	.then(posts => {
	res.status(200).json({reviewPosts:posts});
})
	.catch(err => {
		console.error(err);
		res.status(500).json({error: 'something went wrong'});
	});
});

router.get('/search', (req, res) => {
    console.log(req.query);
    let search = {};
    if(req.query.movieTitle) search = Object.assign({}, search, {movieTitle: req.query.movieTitle}); //{movieTitle: 'abcd'}
    if(req.query.username) search = Object.assign({}, search, {name: {$regex:req.query.username}}); //{movieTitle: 'abcd', username: 'asd'}
    console.log(search);
        movieReviews
        .find(search)
        .sort('-publishedOn')
        .then(movieReviews => res.status(201).json(movieReviews))
        .catch(err => {
           console.error(err);
           res.status(500).json({error: 'Something went wrong'});
        })
    
});

router.get('/id/:id', (req, res) => {
    console.log(req.query);
        movieReviews
        .findOne({
            _id: req.params.id
        })
        .then(movieReview => res.status(201).json(movieReview))
        .catch(err => {
            console.error(err);
            res.status(500).json({error: 'Something went wrong'});
        })
});

router.get('/:username', (req, res) => {
    if(! req.session.userId) {
		res.status(500).send();
    }
	User.findOne({username: req.params.username}, function (err, user) {
    	console.log(user, req.session);
    	if(err) {
    		return res.status(500).send(err);
    	}
    	if(!user) {
    		return res.status(404).send('No user found');
    	}
    	
    	movieReviews
        .find({
           firstName: user.firstName,
           lastName: user.lastName
        
        })
        .sort('-publishedOn')
        .then(movieReviews => res.status(201).json(movieReviews))
        .catch(err => {
           console.error(err);
           res.status(500).json({error: 'Something went wrong'});
        });
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

router.put('/id/:id', (req, res) => {
    const requiredFields = ['text'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message); 
        }
    }
     //res.status(400).send(message);
    
    console.log(`Updating review post with id \`${req.params.id}\``);
    movieReviews
    .findByIdAndUpdate(req.params.id, {$set: {
        text: req.body.text,
        publishedOn: new Date()
        
    }})

    .then(movieReview =>
    	   		movieReviews.findById(req.params.id)
    	   		 .exec()
    	   		 .then(movieReview => res.status(201).json(movieReview.apiRepr()))
    	  )
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