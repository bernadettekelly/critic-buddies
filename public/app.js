var URL = "http://localhost:8080/review-posts"
var URL = "http://localhost:8080/users"

//$.getJSON(url, query, callback)
//.fail(function() {
	//var result = '<p>No results found</p>';
	//$('.CurrentPosts').html(result);
//});

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
//	$.post("/users", {},
		//JSON.stringify({username: 'johnDoe', password: 'password', firstName: 'John', lastName: 'Doe'})
//	function(response){
//		console.log(response)});
//	}
//      $('.Page').hide();
//      $('.Page1').show();
//};

  //$('.SignIn').click(function(e) {
  	//$.post("/users", {},
//		const users = '/users';
//	    for(i = 0; i < '/users'.length; i++) {
//	    	if(username == username[i] && password == password[i]) {
//	    		console.log(username + "is logged in.")
//                return
//	    	}
//	    else {
//	    	return res.status(404).send();
//	    }
//	    }
//
//      $('.Page').hide();
//      $('.Page1').show();
//}
//    	$.get("/users/login", {}, function(response) {
//		console.log(response)});
//    	function displayPersonalMovieReviews(data) {
//      	var result = '';
//      	if (index in data.movieReviews) {
//      		$('body').append(
//      			'<p>' + data.movieReviews[index].text + '</p>');
//      }
//      else {
//      	result = '<p>Sign in or sign up on the home page to view your profile.</p>';
//      }
//      $('.Page2').html(result);
//    };
// };
// $('.submit).click(function(e) {
	//$get("http://localhost:8080/review-posts", {}, function(response) {
//	console.log(response)});
// }
// function displayMovieReviews(data) {
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
// };
//
// $('.PostReviewButton).click(function(e) {
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