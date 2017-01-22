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

function seedBlogData() {
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
  return BlogPost.insertMany(seedData);
}
describe('blog posts API resource', function()) {
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
		let res;
	}

}