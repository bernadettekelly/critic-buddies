///If my login is on the same page where there are most recent posts displayed, do I need
///to make a mock page also?

var mock_movie_posts = {
	"moviePosts": [
		{
			"id": "1",
            "movieTitle": "La La Land",
            "name": "Nora Kelly",
            "text": "I adored 'La La Land. It's probably my favorite film of the year. The music is wonderful and Gosling and Stone are a pleasure to watch.",
            "publishedOn": 12/11/16,
            "comments": "I agree!",
            "commentsName": "Bernadette Kelly"
		},
			"id": "2",
			"movieTitle": "Moana",
			"name": "Seamus Kelly",
			"text": "Moana's story line is sweet and inspirational, but the best part of thid film is the music. Miranda and team created fun, well crafted songs. The cast did an excellent job performing the songs, as well as the funny and heartfelt dialogue.",
			"publishedOn": 12/1/16,
			"comments": "Yeah, the music was awesome.",
			"commentsName": "Tom Smith"
		},
			"id": "3",
			"movieTitle": "Sing Street",
			"name": "Jay Peters",
			"text": "This film is delightful. The young cast is talented and fresh, and the songs are great. It's a charming boy meets girl story that demonstrates the power of passion and kindness.",
			"publishedOn": 10/5/16,
			"comments": "I haven't seen it yet, but now I really want to."
		}
	]
};

function getRecentMoviePosts(callbackFn) {
	setTimeout(function(){callbackFn(mock_movie_posts)}, 1);
}

function displayMoviePosts(data) {
	for (index in data.moviePosts) {
		$('body').append(
			'<p>' + data.moviePosts[index].text + '</p>');
	}
}

function getAndDisplayMoviePosts() {
	getRecentMovePosts(displayMoviePosts);
}

$(function() {
	getAndDisplayMoviePosts();
});

var mock_comments = {
	"moviePostsComments": [
		{
			"id": "1",
            "movieTitle": "La La Land",
            "name": "Nora Kelly",
            "text": "I adored 'La La Land. It's probably my favorite film of the year. The music is wonderful and Gosling and Stone are a pleasure to watch.",
            "publishedOn": 12/11/16,
            "comments": "I agree!",
            "commentsName": "Bernadette Kelly"
		},
			"id": "2",
			"movieTitle": "Moana",
			"name": "Seamus Kelly",
			"text": "Moana's story line is sweet and inspirational, but the best part of thid film is the music. Miranda and team created fun, well crafted songs. The cast did an excellent job performing the songs, as well as the funny and heartfelt dialogue.",
			"publishedOn": 12/1/16,
			"comments": "Yeah, the music was awesome.",
			"commentsName": "Tom Smith"
		},
			"id": "3",
			"movieTitle": "Sing Street",
			"name": "Jay Peters",
			"text": "This film is delightful. The young cast is talented and fresh, and the songs are great. It's a charming boy meets girl story that demonstrates the power of passion and kindness.",
			"publishedOn": 10/5/16,
			"comments": "I haven't seen it yet, but now I really want to."
		}
	]
};

function postRecentMoviePostsComments(callbackFn) {
	setTimeout(function(){callbackFn(mock_comments)}, 1);
}

function displayMoviePostsComments(data) {
	for (index in data.moviePostsComments) {
		$('body').append(
			'<p>' + data.moviePostsComments[index].text + '</p>');
	}
}

function getAndDisplayMoviePostsComments() {
	getRecentMovePostsComments(displayMoviePostsComments);
}

$(function() {
	postAndDisplayMoviePostsComments();
});

var mock_make_new_movie_post = {
	"makeNewMoviePost": [
		{
			"id": "4",
            "movieTitle": "North by Northwest",
            "name": "Bernadette Kelly",
            "text": "If someone has yet to sit down and watch a Hitchcock film, I recommend this a a great starting point. It's thrilling, funny, romantic, and suspensful, as most Hitchcock films are, but also features his 50s glamorous look that I enjoy so much. The setting brings you unlikely places around the country, and the the chemisty between Grant and Saint is perfect.",
            "publishedOn": 1/13/17,
            "comments": "",
            "commentsName": ""
		}
	]
};

function postMakeNewMoviePost(callbackFn) {
	setTimeout(function(){callbackFn(makeNewMoviePost)}, 1);
}

function displayMakeNewMoviePost(data) {
	for (index in data.makeNewMoviePost) {
		$('body').append(
			'<p>' + data.makeNewMoviePost[index].text + '</p>');
	}
}

function getMakeNewMoviePost() {
	getMakeNewMoviePost(displayMakeNewMoviePost);
}

$(function() {
	postAndDisplaymakeNewMoviePost();
});