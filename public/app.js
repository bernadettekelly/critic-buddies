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
//	e.preventDefault();
//	console.log('SignUp click');
//	$.ajax({
//    type: "POST",
//    url: USERS_URL, 
//    data: JSON.stringify({username: 'jane1', password: 'password', firstName: 'Jane', lastName: 'Dashwood'}),
//    contentType: "application/json; charset=utf-8",
//    dataType: "json",
//    success: function (user) {
//      console.log('Successful new user')
//      $('.Page').hide();
//      $('.Page1').show();
//    }
//   })
//  });
//
  //TO LOG IN
  $('.LogIn').click(function(e) {	
 		e.preventDefault(); 
 		console.log('Login click');
    $.ajax({
      type: "POST",
      url: LOGIN_URL, 
      data: JSON.stringify({username: $('#username').val(), password: $('#password').val()}),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (user) {
        console.log('Successful post');
        //displayPersonalMovieReviews(data);
//    }
//})
        if(!user) {
          alert('Sign in or sign up on the home page to view your profile.');
        }else{
          $('.Page').hide();
          $('.Page2').show();
      	 
      	// function displayPersonalMovieReviews(data) {
      	//	e.preventDefault();
      	//	$.ajax({
 	 	//	type: "GET",
 	 	//	url: URL,
 	 	//	data: JSON.stringify({username: $('#username').val(), password: $('password').val()}),
 	 	//	contentType: "application/json; charset=utf-8",
     	//	dataType: "json",
     	//	success: function(data) {
      	//	var result = '';
      	//	for(var index = 0; index < data.reviewPosts.length; index++){
      	//		if (index in data.reviewPosts) {
      	//			result += '<p>' + data.reviewPosts[index].text + '</p>';
      	//		}
      	//	}
      	//	console.log(result);
      	//	$('.container_page2').html(result);
      	//   }
          }
        }
       });
    });
  
// TO SEARCH ON HOME PAGE

 $('.submit').click(function(e) {
	e.preventDefault();
 	$.ajax({
      type: "GET",
      url: URL, 
      data: JSON.stringify({movieTitle: $('#MovieTitle_Search').val(), lastName: $('#LastName_Search').val(), firstName: $('#FirstName_Search').val()}),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        console.log('Successful request');
        displayMovieReviews(data);
       }
 })
 function displayMovieReviews(data) {
	e.preventDefault();
	$.ajax({
 	 type: "GET",
 	 url: URL,
 	 data: JSON.stringify({movieTitle: $('#MovieTitle_Search').val(), lastName: $('#LastName_Search').val(), firstName: $('#FirstName_Search').val()}),
 	 contentType: "application/json; charset=utf-8",
     dataType: "json",
     success: function(data) {
     	console.log('successful display');
	var result = '';
  for(var index = 0; index < data.reviewPosts.length; index++){ 
		if (index in data.reviewPosts) {
		    result += '<p>' + data.reviewPosts[index].text + '</p>';
	    }
  }
	$('.CurrentPosts').show();
    $('.container_main').html(result);
   }
   })
  }
 });
//// TO POST NEW REVIEWS

 $('.PostReviewButton').click(function(e) {
 	e.preventDefault();
 	console.log('Post click');
	  $.ajax({
      type: "POST",
      url: URL, 
      data: JSON.stringify({firstName: $('#FirstName_NewPost').val(), lastName: $('#LastName_NewPost').val(), text: $('#ReviewText').val(), movieTitle: $('#MovieTitle_NewPost').val()}),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        console.log('Successful new post');
        console.log(data);
        displayNewMovieReviews(data);
    }
 })
 function displayNewMovieReviews(data) {
 	e.preventDefault();
 	$.ajax({
 	 type: "GET",
 	 url: URL,
 	 data: JSON.stringify({firstName: $('#FirstName_NewPost').val(), lastName: $('#LastName_NewPost').val(), text: $('#ReviewText').val(), movieTitle: $('#MovieTitle_NewPost').val()}),
 	 contentType: "application/json; charset=utf-8",
     dataType: "json",
     success: function(data) {
     	console.log(183, 'successful get', data);
     	var result = '';
		for(var index = 0; index < data.reviewPosts.length; index++){
			if (index in data.reviewPosts) {
				result += '<p>' + data.reviewPosts[index].text + '<a href="'+data.reviewPosts[index].id+'">Edit</a><p>' + '<a href="'+data.reviewPosts[index].id+'">Delete</a><p>';

		    }
		}
	console.log(result);
    $('.container_main').html(result);
    $('.Page2').show();
    $('.container_page2').html(result);
    $('.Edit').show();
    $('.Delete').show();
    console.log('Successful display');
    }
    })
    }  
  });
//EDIT POSTS
//$('.Edit').click(function(e) {
//	e.preventDefault();
//	$.ajax({
//      type: "PUT",
//      url: URL, 
//      data: JSON.stringify({text: 'abc'}),
//      contentType: "application/json; charset=utf-8",
//      dataType: "json",
//      success: function (data) {
//        console.log('Successful edit');
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
//	$('.container_main').html(result);
//  $('.Page2').html(result);
//
//};
// TO DELETE POSTS

//$('.Delete').click(function(e) {
//$.delete(URL, {},
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
//    $('.CurrentPosts').html(result);
//    $('.Page2').html(result);
//
//};
// TO LOG OUT
$('.SignOut').click(function(e) {
	$.delete(LOGOUT_URL, function(){
	console.log('Successful logout');
  	$('.Page').hide();
      $('.Page1').show();
  })
});

