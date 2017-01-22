const express = require('express');

const app = express();

const reviewPostsRouter = require('./reviewPostsRouter');

const morgan = require('morgan');

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(morgan('common'));

app.use('/review-posts', reviewPostsRouter);

app.use(express.static('public'));

app.listen(process.env.PORT || 8080);

exports.app = app