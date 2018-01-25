var BASE_URL =  "https://critic-buddies.herokuapp.com/";  //"http://localhost:8080/";
var URL = BASE_URL + "review-posts";
var USER_MR_URL = BASE_URL + "review-posts/";
var LOGOUT_URL = BASE_URL + "users/logout";
var LOGIN_URL = BASE_URL + "users/login";
var ID_URL = BASE_URL + "review-posts/id/";
var USERS_URL = BASE_URL + "users/";

var UserData = {
  username: null,
  firstName: null,
  lastName: null,
  review_post_id: null
}

function populateStorage() {
	var hideIt = $('#checkboxInput').is(':checked');
	localStorage.setItem('hideModal', hideIt);
}

$('.checkbox').click(populateStorage);

function showModal() {
		var hide = localStorage.getItem('hideModal');
		if(hide === 'true'){
			$('.modal').hide();
		}
}

$(function() {
  $('a').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, window.innerHeight + 110, 'linear');
  });
});

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

$(document).ready(function() {
	$('.Page').hide();
	$('.Edit').hide();
	$('.Delete').hide();
	$('.Page1').show();
	$('.SignOutButton').hide();
	$('.editModal').hide();
	$('.ProfileButton').hide();
	$('.SignInModalClass').hide();
	$('.EditModalClass').hide();
	$('.columnCreate').hide();
	$('.container2').css("min-height", window.innerHeight + 110);
	showModal();
});

$('.MyProfile').click(function(e) {
	e.preventDefault();
	$('.Page').hide();
	$('.Page2').show();
	$('.Page2Body').show();
});

$('.ProfileButton').click(function(e) {
	e.preventDefault();
	$('.Page').hide();
	$('.Page2').show();
	$('.HomeButtonSection').show();
	$('.columnCreate').show();
});

$('.SignUpButton').click(function(e) {
	e.preventDefault();
	$('.Page').hide();
	$('.Page3').show();
});

$('.SignInButton').click(function(e) {
	e.preventDefault();
	$('.SignInModalClass').show();
});

$('.Home').click(function(e) {
	e.preventDefault();
	$('.Page').hide();
	$('.columnCreate').hide();
	$('.Page1').show();
});

$('.close').click(function(e) {
	e.preventDefault();
	$('.modal').hide();
});

$('.SignInclose').click(function(e) {
	e.preventDefault();
	$('.SignInModalClass').hide();
});

$('.Editclose').click(function(e) {
	e.preventDefault();
	$('.EditModalClass').hide();
});

$('.delete_link').click(function(e) {
	e.preventDefault();
	$('.editModal').show();
});

$('.editClose').click(function(e) {
	e.preventDefault();
	$('.editModal').hide();
});

$('.back').click(function(e) {
	e.preventDefault();
	$('.Page').hide();
	$('.Page2').show();
});

//TO CREATE LOGIN
$('.SubmitSignUp').click(function(e) {
  e.preventDefault();
  console.log('SignUp click');
  $.ajax({
    type: "POST",
    url: USERS_URL, 
    data: JSON.stringify({
      username: $('#username_SignUp').val(), 
      password: $('#password_SignUp').val(), 
      firstName: $('#FirstName_SignUp').val(), 
      lastName: $('LastName_SignUp').val()
    }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (user) {
      console.log('Successful new user')
      $('.Page').hide();
      $('.Page1').show();
    }
   });
});

//TO LOG IN
$('.LogIn').click(function(e) {	
  e.preventDefault(); 
  console.log('Login click');
  $.ajax({
    type: "POST",
    url: LOGIN_URL, 
    data: JSON.stringify({
      username: $('#username').val(), 
      password: $('#password').val()
    }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (user) {
      console.log('Successful post', user);
      UserData.username = user.username;
      UserData.firstName = user.firstName;
      UserData.lastName = user.lastName;

      displayPersonalMovieReviews(user.username);
      
      if(!user) {
        alert('Sign in or sign up on the home page to view your profile.');
      }else{
        $('.Page').hide();
        $('.Page2').show();
        $('.SignOutButton').show();
        $('.ProfileButton').show();
        $('.SignInButton').hide();
        $('.SignUpButton').hide();
        $('.SignInModalClass').hide();
        $('.columnCreate').show();
      }
    }
  });
});

function displayPersonalMovieReviews(username) {
  $.ajax({
    type: "GET",
    url: USER_MR_URL+username,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data) {
      console.log(data);
      var result = '';
      for(var index = 0; index < data.length; index++){
        if (index in data) {
          result += '<p class="movieTitle">' + data[index].movieTitle + '</p>' + '<p class="firstName">' + data[index].firstName + " " + data[index].lastName + '</p>' + '<p class="publishedOn">' + data[index].publishedOn + '</p>' + '<p class="text">' + data[index].text + '<p>' + '<a class="edit_link" href="'+data[index]._id+'">Edit</a><p>' + '<a class="delete_link" href="'+data[index]._id+'">Delete</a><p>';
        }
      }
      console.log(result);
      $('.container_page2').html(result);
    }
  });
};

// TO SEARCH ON HOME PAGE
$('.submit').click(function(e) {
  e.preventDefault();
  $.ajax({
    type: "GET",
    url: USER_MR_URL+"search",
    data: {
      movieTitle: $('#MovieTitle_Search').val(),
      username: $('#Username_Search').val()
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      console.log('Successful request');
      displayMovieReviews(data);
    $('.CurrentPosts').hide();
    $('html, body').animate({ scrollTop: $('.container2').offset().top}, window.innerHeight, 'linear');
    }
	});
});

function displayMovieReviews(data) {
      var result = '';
      if(data.length > 0){
	      for(var index = 0; index < data.length; index++){ 
	        if (index in data) {
	          result += '<p class="movieTitle">' + data[index].movieTitle + '</p>' + '<p class="firstName">' + (data[index].name ? data[index].name : data[index].firstName + " " + data[index].lastName) + '</p>' + '<p class="publishedOn">' + data[index].publishedOn + '</p>' + '<p class="text">' + data[index].text + '</p>';
	        }
	      }
    	}
    	else {
    		result = "No results to display."
    	}
      $('.container_main').html(result);
      console.log(result);
};

// TO POST NEW REVIEWS
$('.PostReviewButton').click(function(e) {
  e.preventDefault();
  console.log('Post click');
  $.ajax({
    type: "POST",
    url: URL, 
    data: JSON.stringify({firstName: UserData.firstName, lastName: UserData.lastName, text: $('#ReviewText').val(), movieTitle: $('#MovieTitle_NewPost').val()}),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      console.log('Successful new post');
      console.log(data);
      displayNewMovieReviews(data);
    }
  });
});

function displayNewMovieReviews(data) {
  $.ajax({
    type: "GET",
    url: USER_MR_URL+UserData.username,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data) {
      console.log(183, 'successful get', data);
      var result = '';
      var mainResult = '<p class="movieTitle">' + data[0].movieTitle + '</p>' + '<p class="firstName">' + data[0].firstName + " " + data[0].lastName + '</p>' + '<p class="publishedOn">' + data[0].publishedOn + '</p>' + '<p class="text">' + data[0].text + '<p>' + '<a class="edit_link" href="'+data[0]._id+'">Edit</a><p>' + '<a class="delete_link" href="'+data[0]._id+'">Delete</a><p>';
      for(var index = 0; index < data.length; index++){
        if (index in data) {
          result += '<p class="movieTitle">' + data[index].movieTitle + '</p>' + '<p class="firstName">' + data[index].firstName + " " + data[index].lastName + '</p>' + '<p class="publishedOn">' + data[index].publishedOn + '</p>' + '<p class="text">' + data[index].text + '<p>' + '<a class="edit_link" href="'+data[index]._id+'">Edit</a><p>' + '<a class="delete_link" href="'+data[index]._id+'">Delete</a><p>';
		    }
      }
      console.log(result);
      $('.Page2').show();
      $('.container_page2').html(result);
      $('.container_main').html(mainResult);
      $('.CurrentPosts').hide();
      $('.Edit').show();
      $('.Delete').show();
      console.log('Successful display');
    }
  });
};


 //EDIT POSTS
 $('.container_page2').on("click", '.edit_link', function(e) {
  e.preventDefault();
  $('.EditModalClass').show();
  $('.Edit').show();
  console.log('show page5');
  UserData.review_post_id = $(this).attr('href')
  $.ajax({
    type: "GET",
    url: ID_URL+$(this).attr('href'), 
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      console.log('Successful get');
      displayReviewforEdit(data);
      console.log(data);
    }
  });
});

 function displayReviewforEdit(data) {
      $('#EditText').val(data.text);
      $('#editTitle').val(data.movieTitle);
      
};

$('.Edit').click(function(e) {
  e.preventDefault();
  $.ajax({
    type: "PUT",
    url: ID_URL+UserData.review_post_id, 
    data: JSON.stringify({
      text: $('#EditText').val(),
      movieTitle: $('#editTitle').val()
    }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      console.log('Successful edit');
      displayUpdatedMoviePosts(data);
    }
	});
});

function displayUpdatedMoviePosts(data) {
  $.ajax({
		type: "GET",
		url: USER_MR_URL+UserData.username,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (data) {
			console.log('Successful display')
      var result = '';
      var mainResult = '<p class="movieTitle">' + data[0].movieTitle + '</p>' + '<p class="firstName">' + data[0].firstName + " " + data[0].lastName + '</p>' + '<p class="publishedOn">' + data[0].publishedOn + '</p>' + '<p class="text">' + data[0].text + '<p>' + '<a class="edit_link" href="'+data[0]._id+'">Edit</a><p>' + '<a class="delete_link" href="'+data[0]._id+'">Delete</a><p>';
      for(var index = 0; index < data.length; index++){
        if (index in data) {
          result += '<p class="movieTitle">' + data[index].movieTitle + '</p>' + '<p class="firstName">' + data[index].firstName + " " + data[index].lastName + '</p>' + '<p class="publishedOn">' + data[index].publishedOn + '</p>' + '<p class="text">' + data[index].text + '<p>' + '<a class="edit_link" href="'+data[index]._id+'">Edit</a><p>' + '<a class="delete_link" href="'+data[index]._id+'">Delete</a><p>';
        }
      }
      $('.container_page2').html(result);
      $('.container_main').html(mainResult);
      $('.CurrentPosts').hide();
      $('.EditModalClass').hide();
      $('.Page').hide();
      $('.Page2').show();
    }
  });
}

// TO DELETE POSTS
var deletePostId;

$('.container_page2').on("click", '.delete_link', function(e) {
  e.preventDefault();
  deletePostId = $(this).attr('href');
  $('.editModal').show();
});
$('.editModal').on("click", '.modalDeleteButton', function(e) {
	e.preventDefault();
  $.delete(USER_MR_URL+deletePostId, function(){
    console.log('Successful delete');
    deletePostId = null;
    $('.editModal').hide();
    dislplayMovieReviewsAfterDelete();
  });
});

function dislplayMovieReviewsAfterDelete(data) {
  $.ajax({
    type: "GET",
    url: USER_MR_URL+UserData.username,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      console.log('Successful display')
      var result = '';
      for(var index = 0; index < data.length; index++){
        if (index in data) {
          result += '<p class="movieTitle">' + data[index].movieTitle + '</p>' + '<p class="firstName">' + data[index].firstName + " " + data[index].lastName + '</p>' + '<p class="publishedOn">' + data[index].publishedOn + '</p>' + '<p class="text">' + data[index].text + '<p>' + '<a class="edit_link" href="'+data[index]._id+'">Edit</a><p>' + '<a class="delete_link" href="'+data[index]._id+'">Delete</a><p>';
        }
      }
      $('.container_main').html(result);
      $('.container_page2').html(result);
      $('.Page').hide();
      $('.Page2').show();
    }
  });
};

// TO LOG OUT
$('.SignOut').click(function(e) {
	$.delete(LOGOUT_URL, function(){
    console.log('Successful logout');
    $('.Page').hide();
    $('.Page1').show();
    $('.SignInButton').show();
    $('.SignUpButton').show();
    $('.ProfileButton').hide();
    $('.SignOutButton').hide();
  });
});
