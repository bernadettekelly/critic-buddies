const express = require('express');

const app = express();

const reviewPostsRouter = require('./reviewPostsRouter');

app.use('/review-posts', reviewPostsRouter);

app.use(express.static('public'));

app.listen(process.env.PORT || 8080);

exports.app = app