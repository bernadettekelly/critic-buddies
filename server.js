const express = require('express');

const app = express();

const mongoose = require('mongoose');

const {DATABASE_URL, PORT} = require('./config');

mongoose.Promise = global.Promise;

const reviewPostsRouter = require('./reviewPostsRouter');

const morgan = require('morgan');

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(morgan('common'));

app.use('/review-posts', reviewPostsRouter);

app.use(express.static('public'));

app.listen(process.env.PORT || 8080);

exports.app = app

let server;

function runServer(databaseURL=DATABASE_URL, port=PORT) {
	return new Promise((resolve, reject) => {
		mongoose.connect((databaseUrl, err) => {
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
	});
}
if (require.main === module) {
	runServer().catch(err => console.error(err));
}