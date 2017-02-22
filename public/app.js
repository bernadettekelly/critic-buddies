var URL = "http://localhost:8080/review-posts"
var LOGOUT_URL = "http://localhost:8080/users/logout"
var LOGIN_URL = "http://localhost:8080/users/login"
var USERS_URL = "http://localhost:8080/users/";

/* JQuery PUT and DELETE Methods */
$.put = function(url, data, callback, type){
 
  if ( $.isFunction(data) ){
    type = type || callback,
    callback = data,
    data = {}
  }
 
  return $.ajax({
    url: url,
    type: 'PUT',
    success: callback,
    data: data,
    contentType: type
  });
}

$.delete = function(url, data, callback, type){
 
  if ( $.isFunction(data) ){
    type = type || callback,
        callback = data,
        data = {}
  }
 
  return $.ajax({
    url: url,
    type: 'DELETE',
    success: callback,
    data: data,
    contentType: type
  });
}
/* ======================= */


//$.getJSON(url, query, callback)
//.fail(function() {
	//var result = '<p>No results found</p>';
	//$('.CurrentPosts').html(result);
//});

$(document).ready(function() {
	$('.Page').hide();
	$('.Edit').hide();
	$('.Delete').hide();
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


//TO CREATE LOGIN

//$('.SubmitSignUp').click(function(e) {
//	$.post("/users", {}, JSON.stringify({username: 'johnDoe', password: 'password', firstName: 'John', lastName: 'Doe'})
//	function(response){
//		console.log(response)});
//	}
//      $('.Page').hide();
//      $('.Page1').show();
//});
//  TO LOG IN

  $('.SignIn').click(function(e) {	
  	$.post(LOGIN_URL, function (req, res) {
  		if(!user) {
    		return res.status(404).json({error: 'Sign in or sign up on the home page to view your profile.'});
    	
      $('.Page').hide();
      $('.Page1').show();
   }
    		$.get("/users/login", {}, function(response) {
			console.log(response)});
    		function displayPersonalMovieReviews(data) {
      		var result = '';
      		if (index in data.movieReviews) {
      			$('body').append(
      				'<p>' + data.movieReviews[index].text + '</p>');
      		}
      }
      $('.Page2').html(result);
    });
 });
// TO SEARCH ON HOME PAGE

// $('.submit').click(function(e) {
// 	$.get("/review-posts", {}, function(response) {
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
// TO POST NEW REVIEWS

// $('.PostReviewButton').click(function(e) {
	//$.post("/review-posts", {},
//	JSON.stringify({username: 'johnDoe', password: 'password', FirstName: 'Nora', LastName: 'Kelly', text: 'abc'})
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
//      $('.Edit').show();
//      $('.Delete').show();
//    
//};
//EDIT POSTS
//$('.Edit').click(function(e) {
//	$.put("/review-posts", {},
//    	JSON.stringify({username: 'johnDoe', password: 'password', id: '1'})
//    	function(response){
//		console.log(response)});
//	}
//};
//function displayUpdatedMoviePosts(data) {
//	var result = '';
//	if (index in data.movieReviews) {
//		$('body').append(
//			'<p>' + data.movieReviews[index].text + '</p>');
//	}
//	$('.CurrentPosts', '.Page2').html(result);
//
//};
// TO DELETE POSTS

//$('.Delete').click(function(e) {
//$.delete("/review-posts", {},
//	({username: 'johnDoe', password: 'password', id: '1'})
//    function(response){
//    	console.log(response)});
//    }
//};
//function dislplayMovieReviews(data) {
//	var result = '';
//	if (index in data.movieReviews) {
//		$('body').append(
//			'<p>' + data.movieReviews[index].text + '</p>');
//	}
//    $('.CurrentPosts', 'Page2').html(result);
//
//};
// TO LOG OUT

$('.SignOut').click(function(e) {
	$.delete(LOGOUT_URL, function(){
		$('.Page').show();
    $('.Page1').hide();
	});
};