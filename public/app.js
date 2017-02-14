var URL = "http://localhost:8080/review-posts"
var URL = "http://localhost:8080/UsersModels"

//$.getJSON(url, query, callback)

$(document).ready(function() {
	$('.Page').hide();
	$('.Page1').show();
});

$('.MyProfile').click(function(e) {
	e.preventDefault();
	$('.Page').hide();
	$('.Page2').show();
});

$('.SignUpButton').click(function(e) {
	e.preventDefault();
	$('.Page').hide();
	$('.Page3').show();
});

$('.SignInButton').click(function(e) {
	e.preventDefault();
	$('.Page').hide();
	$('.Page4').show();
});

//$('.SubmitSignUp').click(function(e) {
//	$post("http://localhost:8080/UsersModels", {},
		//JSON.stringify({username: 'johnDoe', password: 'password'})
//	function(response){
//		console.log(response)});
//	}
//      $('.Page').hide();
//      $('.Page1').show();
//};

  //$('.SignIn').click(function(e) {
  	//$post("http://localhost:8080/UsersModels", {},
		//JSON.stringify({username: 'johnDoe', password: 'password'})
//	function(response){
//		console.log(response)});
//  }
//      $('.Page').hide();
//      $('.Page1').show();
//};

//$('.submit).click(function(e) {
	//$get("http://localhost:8080/review-posts", {}, function(response) {
//	console.log(response)});
//}
//function displayMovieReviews(data) {
//	var result = '';
//	if (index in data.movieReviews) {
//		$('body').append(
//			'<p>' + data.movieReviews[index].text + '</p>');
//	}
//	else {
//		result = '<p>No results found</p>';
//	}
//	$('.CurrentPosts').html(result);
//
//};
//
//$('.PostReviewButton).click(function(e) {
	//$post("http://localhost:8080/review-posts", {},
//	JSON.stringify({username: 'johnDoe', password: 'password', FirstName: 'Nora', LastName: 'Kelly, ReviewText: 'abc'})
//	function(response){
//		console.log(response)});
//	}
//
//function displayNewMovieReviews(data) {
//	var result = '';
//	if (index in data.movieReviews) {
//		$('body').append(
//			'<p>' + data.movieReviews[index].text + '<p>');
//	}
//    $('.CurrentPosts', '.Page2').html(result);
//    
//};
//
//$put("http://localhost:8080/review-posts", {},
//    	JSON.stringify({username: 'johnDoe', password: 'password', id: '1'})
//    	function(response){
//		console.log(response)});
//	}
//
//function displayUpdatedMoviePosts(data) {
//	var result = '';
//	if (index in data.movieReviews) {
//		$('body').append(
//			'<p>' + data.movieReviews[index].text + '</p>');
//	}
//	$('.CurrentPosts', '.Page2').html(result);
//
//};
//
//$delete("http://localhost:8080/review-posts", {},
//	({username: 'johnDoe', password: 'password', id: '1'})
//    function(response){
//    	console.log(response)});
//    }
//
//function dislplayMovieReviews(data) {
//	var result = '';
//	if (index in data.movieReviews) {
//		$('body').append(
//			'<p>' + data.movieReviews[index].text + '</p>');
//	}
//    $('.CurrentPosts', 'Page2').html(result);
//
//};
//
//