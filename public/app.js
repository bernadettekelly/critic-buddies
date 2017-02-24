var URL = "http://localhost:8080/review-posts"
var LOGOUT_URL = "http://localhost:8080/users/logout"
var LOGIN_URL = "http://localhost:8080/users/login"
var USERS_URL = "http://localhost:8080/users/";

//app.use(function(req, res, next) {
//	res.header('Access-Control-Allow-Origin', "*")
//	res.header('Access-Control-Allow-Methods', GET, PUT, POST, DELETE);
//	res.header('Access-Control-Allow-Headers', 'Content-Type');
//	next();
//})
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


//$.getJSON(url, query, callback)
//.fail(function() {	
//	var result = '<p>No results found</p>';	
//	$('.CurrentPosts').html(result);
// });


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
//	$.post("USERS_URL", {}, JSON.stringify({username: 'johnDoe', password: 'password', firstName: 'John', lastName: 'Doe'}), function(response){
//		console.log(response)});
//	});
//      $('.Page').hide();
//      $('.Page1').show();
//
//  TO LOG IN
  $('.LogIn').click(function(e) {	
 		e.preventDefault(); 
 		console.log('Login click');
   $.post(LOGIN_URL, JSON.stringify({username: 'jane1', password: 'password'}),function (user) {
  	console.log('Successful post');
  	if(!user) {
   		alert('Sign in or sign up on the home page to view your profile.');
   	}else{
   		$('.Page').hide();
    	$('.Page2').show();
      	//$.get("/review-posts/", {}, function(data) {
      	//	console.log(data);
      	//	var result = '';
      	//	for(var index = 0; index < data.length; index++){
      	//		if (index in data.movieReviews) {
      	//			result += '<p>' + data.movieReviews[index].text + '</p>';
      	//		}
      	//	}
      	//	$('.Page2').html(result);
      	//});
       }
    })
   });
// TO SEARCH ON HOME PAGE

// $('.submit').click(function(e) {
// 	$.get("/review-posts", {}, function(response) {
//	console.log(response)});
// }
// function displayMovieReviews(data) {
//	var result = '';
//  for(var index = 0; index < data.length; index++){ 
//		if (index in data.movieReviews) {
//		    result += '<p>' + data.movieReviews[index].text + '</p>');
//	    }
//  }
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
//  for(var index = 0; index < data.length; index++){
//		if (index in data.movieReviews) {
//		result += '<p>' + data.movieReviews[index].text + '<p>');
//      }
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
//	for(var index = 0; index < data.length; index++){
//		if (index in data.movieReviews) {
//		result += '<p>' + data.movieReviews[index].text + '<p>');
//      }
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
//	for(var index = 0; index < data.length; index++){
//		if (index in data.movieReviews) {
//		result += '<p>' + data.movieReviews[index].text + '<p>');
//      }
//	}
//    $('.CurrentPosts', 'Page2').html(result);
//
//};
// TO LOG OUT
//$('.SignOut').click(function(e) {
//	$.delete(LOGOUT_URL, function(){
//  	$('.Page').hide();
//      $('.Page1').show();
//  });
//

//};

