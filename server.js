const express = require('express');

const app = express();

const mongoose = require('mongoose');

const {DATABASE_URL, PORT} = require('./config');

mongoose.Promise = global.Promise;

const reviewPostsRouter = require('./reviewPostsRouter');

const UsersRouter = require('./UsersRouter');

const session = require('express-session');

const morgan = require('morgan');

const bodyParser = require('body-parser');

var MongoStore = require('connect-mongo')(session);

var sess = {
  store: new MongoStore({ url: DATABASE_URL }),
  secret: '12345abcde',
  name: "SessionMgmt",
  resave: false,
  saveUninitialized: true,
  cookie: { 
    path: '/',
    maxAge: 10000
  } 
};

app.use(session(sess));

app.use(bodyParser.json());

app.use(morgan('common'));

app.use('/review-posts', reviewPostsRouter);

app.use('/users', UsersRouter);

app.use(express.static('public'));

///app.listen(process.env.PORT || 8080);

//exports.app = app

let server;
console.log(DATABASE_URL, PORT);

function runServer(databaseURL=DATABASE_URL, port=PORT) {
	return new Promise((resolve, reject) => {
     console.log(databaseURL, port);
		mongoose.connect(databaseURL, (err) => {
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
		});
	});
}     

function closeServer() {
	return mongoose.disconnect().then(() => {
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
if (require.main === module) {
	runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer}

