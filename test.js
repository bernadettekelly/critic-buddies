const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const should = chai.should();
const {DATABASE_URL} = require('../config');
const {BlogPost} = require('../models');
const {closeServer, runServer, app} = require('../server');

chai.use(chaiHTTP);

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
describe('review posts API resource', function()) {
	before(function();
});

	beforeEach(function() {
		return runServer();
	});

	afterEach(function() {
		return tearDownDb();
	});

	after(function() {
		return closeServer();
	});

	describe('GET endpoint', function() {
		it ('should return all existing posts', function() {

		let res;
		return chai.request(app)
		.get('/posts')
		.then(_res => {
			res = _res;
			res.should.have.status(200);
			res.body.should.have.length.of.at.least(1);

			return reviewPost.count();
		});
		.then(count => {
			res.body.should.have.length.of(count);
		});
	});

	it('should return posts with right fields', function() {
		let resPost;
		return chai.request(app)
			.get('/posts')
			.then(function(res) {
			  res.should.have.status(200);
			  res.should.be.json;
			  res.body.should.be.a('array');
			  res.body.should.have.length.of.at.least(1);
			  res.body.forEach(function(post) {
			  	post.should.be.a('object');
			  	post.should.include.keys('id', 'movieTitle', 'name', 'text', 'publidhedOn');
			  });
			  resPost = res.body[0];
			  return reviewPost.findById(resPost.id).exec();
			  })
			.then(post => {
				resPost.movieTitle.should.equal(post.movieTitle);
				resPost.name.should.equal(post.name);
				resPost.text.should.equal(post.text);
				resPost.publidhedOn.should.equal(post.publidhedOn);
			});
		  });
	    });
	
	describe('POST endpoint', function() {
		it('should add a new post', function() {

		const newPost = {
          movieTitle: faker.lorem.sentence(),
          name: {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
          },
          text: faker.lorem.text(),
          publidhedOn: faker.date()
      };

      return chai.request(app)
        .post('/posts')
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
            `${newPost.name.firstName} ${newPost.author.lastName}`);
          res.body.text.should.equal(newPost.text);
          res.body.publidhedOn.should.equal.(newPost.publidhedOn);
          return reviewPost.findById(res.body.id).exec();
        })
        .then(function(post) {
          post.movieTitle.should.equal(newPost.movieTitle);
          post.text.should.equal(newPost.text);
          post.name.firstName.should.equal(newPost.name.firstName);
          post.name.lastName.should.equal(newPost.name.lastName);
          post.publidhedOn.should.equal(newPost.publidhedOn);
        });
    });
  });
	
   describe('PUT endpoint', function() {
     it('should update fields you send over', function() {
      const updateData = {
        movieTitle: 'Gone with the Wind',
        text: 'abc',
        publidhedOn: '1/22/17',
        name: {
          firstName: 'Mary',
          lastName: 'Smith'
        }
      };

      return reviewPost
        .findOne()
        .exec()
        .then(post => {
          updateData.id = post.id;

          return chai.request(app)
            .put(`/posts/${post.id}`)
            .send(updateData);
        })
        .then(res => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.movieTitle.should.equal(updateData.title);
          res.body.name.should.equal(
            `${updateData.name.firstName} ${updateData.name.lastName}`);
          res.body.text.should.equal(updateData.text);
          res.body.publidhedOn.should.equal(updateData.publidhedOn);

          return BlogPost.findById(res.body.id).exec();
        })
        .then(post => {
          post.movieTitle.should.equal(updateData.title);
          post.text.should.equal(updateData.text);
          post.name.firstName.should.equal(updateData.name.firstName);
          post.name.lastName.should.equal(updateData.name.lastName);
          post.publidhedOn.should.equal(update.name.publidhedOn);
        });
    });
  });

   describe('DELETE endpoint', function() {
   	it('should delete a post by id', function() {

      let post;

      return BlogPost
        .findOne()
        .exec()
        .then(_post => {
          post = _post;
          return chai.request(app).delete(`/posts/${post.id}`);
        })
        .then(res => {
          res.should.have.status(204);
          return BlogPost.findById(post.id);
        })
        .then(_post => {
       
          should.not.exist(_post);
        });
    });
  });
});


