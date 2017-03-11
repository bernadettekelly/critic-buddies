var URL = "http://localhost:8080/review-posts"
var USER_MR_URL = "http://localhost:8080/review-posts/"
var LOGOUT_URL = "http://localhost:8080/users/logout"
var LOGIN_URL = "http://localhost:8080/users/login"
var ID_URL = "http://localhost:8080/review-posts/id/"
var USERS_URL = "http://localhost:8080/users/";

var UserData = {
  username: null,
  firstName: null,
  lastName: null,
  review_post_id: null
}

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
          result += '<p>' + data[index].movieTitle + '</p>' + '<p>' + data[index].firstName + " " + data[index].lastName +'</p>' + '<p>' + data[index].publishedOn + '</p>' + '<p>' + data[index].text + '<p>' + '<a class="edit_link" href="'+data[index]._id+'">Edit</a><p>' + '<a class="delete_link" href="'+data[index]._id+'">Delete</a><p>';
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
      //firstName: UserData.firstName.val(),
      //lastName: UserData.lastName.val(),
      //username: UserData.username
    },
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      console.log('Successful request');
      displayMovieReviews(data);
    }
	});
});

function displayMovieReviews(data) {
      var result = '';
      for(var index = 0; index < data.length; index++){ 
        if (index in data) {
          result += '<p>' + data[index].movieTitle + '</p>' + '<p>' + data[index].firstName + " " + data[index].lastName + '</p>' + '<p>' + data[index].publishedOn + '</p>' + '<p>' + data[index].text + '</p>';
        }
      }
      //$('.CurrentPosts').show();
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
      for(var index = 0; index < data.length; index++){
        if (index in data) {
          result += '<p>' + data[index].movieTitle + '</p>' + '<p>' + data[index].firstName + " " + data[index].lastName +'</p>' + '<p>' + data[index].publishedOn + '</p>' + '<p>' + data[index].text + '<p>' + '<a class="edit_link" href="'+data[index]._id+'">Edit</a><p>' + '<a class="delete_link" href="'+data[index]._id+'">Delete</a><p>';
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
  });
};

//$('.container_page2').on('click', 'a.edit', function(e){
//  e.preventDefault();
// });

 //EDIT POSTS
 $('.container_page2').on("click", '.edit_link', function(e) {
  e.preventDefault();
  $('.Page').hide();
  $('.Page5').show();
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
};

$('.Edit').click(function(e) {
  e.preventDefault();
  $.ajax({
    type: "PUT",
    url: ID_URL+UserData.review_post_id, 
    data: JSON.stringify({
      text: $('#EditText').val()
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
      for(var index = 0; index < data.length; index++){
        if (index in data) {
          result += '<p>' + data[index].movieTitle + '</p>' + '<p>' + data[index].firstName + " " + data[index].lastName +'</p>' + '<p>' + data[index].publishedOn + '</p>' + '<p>' + data[index].text + '<p>' + '<a class="edit_link" href="'+data[index]._id+'">Edit</a><p>' + '<a class="delete_link" href="'+data[index]._id+'">Delete</a><p>';
        }
      }
      $('.container_main').html(result);
      $('.container_page2').html(result);
      $('.Page').hide();
      $('.Page2').show();
    }
  });
}

// TO DELETE POSTS
$('.container_page2').on("click", '.delete_link', function(e) {
  e.preventDefault();
  $.delete(USER_MR_URL+$(this).attr('href'), function(){
    console.log('Successful delete');
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
          result += '<p>' + data[index].movieTitle + '</p>' + '<p>' + data[index].firstName + " " + data[index].lastName +'</p>' + '<p>' + data[index].publishedOn + '</p>' + '<p>' + data[index].text + '<p>' + '<a class="edit_link" href="'+data[index]._id+'">Edit</a><p>' + '<a class="delete_link" href="'+data[index]._id+'">Delete</a><p>';
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
  });
});
