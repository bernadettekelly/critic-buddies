const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const should = chai.should();
const {DATABASE_URL} = require('./config');
const {movieReviews} = require('./models');
const {closeServer, runServer, app} = require('./server');

chai.use(chaiHttp);

function tearDownDB() {
	return new Promise((resolve, reject) => {
		console.warn('Deleting databse');
		mongoose.connection.dropDatabase()
		.then(result => resolve(result))
		.catch(err => reject(err))
	});
}

function seedReviewPostData() {
	console.info('seeding review post data');
	console.seedData = [];
	for (let i=1; i<=10; i++) {
    seedData.push({
      name: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName()
      },
      movieTitle: faker.lorem.sentence(),
      text: faker.lorem.text(),
      publidhedOn: faker.date()
    });
  }
  return reviewPost.insertMany(seedData);
}
describe('review posts API resource', function() {
	before(function() {
		return runServer();
	});

	///beforeEach(function() {
		///return runServer();
	///});

	////afterEach(function() {
		///return tearDownDb();
	///});

	after(function() {
		return closeServer();
	});

	describe('POST endpoint', function() {
		it('should add a new post', function() {
			const newPost = {
				movieTitle: faker.lorem.sentence(),
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				text: faker.lorem.text(),
	 		};
	      	return chai.request(app)
	        .post('/review-posts')
	        .send(newPost)
	        .then(function(res) {
	        	res.should.have.status(201);
	        	res.should.be.json;
	        	res.body.should.be.a('object');
	        	res.body.should.include.keys(
	        		'id', 'movieTitle', 'text', 'name', 'publishedOn');
	        	res.body.movieTitle.should.equal(newPost.movieTitle);
	        	res.body.id.should.not.be.null;
	        	res.body.name.should.equal(
	        		`${newPost.firstName} ${newPost.lastName}`);
	        	res.body.text.should.equal(newPost.text);
	        	//res.body.publishedOn.should.equal(newPost.publishedOn);
	        });
	    });
    });


	describe('GET endpoint', function() {
		it ('should return all existing posts', function() {
			return chai.request(app)
			.get('/review-posts')
			.then(res => {
				res.should.have.status(200);
				res.body.reviewPosts.should.have.length.of.at.least(1);
				return res.body.reviewPosts.length;
			
			});
		});

		///200 {reviewPost: []}
	    it('should return posts with right fields', function() {
			return chai.request(app)
			.get('/review-posts')
			.then(function(res) {
				res.should.have.status(200);
				res.should.be.json;
				res.body.reviewPosts.should.be.a('array');
				res.body.reviewPosts.should.have.length.of.at.least(1);
				res.body.reviewPosts.forEach(function(post) {
			  	  post.should.be.a('object');
			  	  post.should.include.keys('_id', 'movieTitle', 'text', 'publishedOn');
			    });
			});
	    });
	});
	
  	describe('PUT endpoint', function() {
    	it('should update fields you send over', function() {
   			const updateData = {
   			  movieTitle: 'Sing Street',
   			  text: 'abc',
   			  //publishedOn: new Date(),
   			  firstName: 'Jay',
   			  lastName: 'Peters'
   			};
    	
    	 	return movieReviews
    	   	.findOne()
    	   	.exec()
    	   	.then(post => {
    	     	updateData.id = post.id
    	     	return chai.request(app)
    	       	.put(`/review-posts/${post.id}`)
    	       	.send(updateData);
    	   	})
    	   	.then(res => {
    	     	res.should.have.status(201);
    	     	res.should.be.json;
    	     	res.body.should.be.a('object');
    	     	console.log(updateData);
    	     	res.body.movieTitle.should.equal(updateData.movieTitle);
    	     	res.body.name.should.equal(
    	       `${updateData.firstName} ${updateData.lastName}`);
    	     	res.body.text.should.equal(updateData.text);
    	     	res.body.publishedOn = new Date(res.body.publishedOn);
    	     	res.body.publishedOn.should.be.a('date');
    	     	return movieReviews.findById(res.body.id).exec();
    	   	})
    	   	.then(post => {
    	     	post.movieTitle.should.equal(updateData.movieTitle);
    	     	post.text.should.equal(updateData.text);
    	     	post.firstName.should.equal(updateData.firstName);
    	     	post.lastName.should.equal(updateData.lastName);
    	     	//post.publishedOn.should.equal(updateData.publishedOn);
    	   	});
    	});
 	})
  describe('DELETE endpoint', function() {
  	it('should delete a post by id', function() {
     let post;
     return movieReviews
       .findOne()
       .exec()
       .then(_post => {
         post = _post;
         return chai.request(app).delete(`/review-posts/${post.id}`);
       })
       .then(res => {
         res.should.have.status(204);
         return movieReviews.findById(post.id);
       })
       .then(_post => {
      
         should.not.exist(_post);
       });
    });
  });
});