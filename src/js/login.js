// Generated by CoffeeScript 1.4.0
(function() {
  var handle_swipe_left, init, logger, login, login_error, login_success, open_about, open_index;

  logger = forge.logging;

  init = function() {
    $('.jumbotron').fadeIn();
    $(document).on('swipeLeft', handle_swipe_left);
    return $('.btn-primary').click(login);
  };

  handle_swipe_left = function() {
    return $('.jumbotron').fadeOut(open_about);
  };

  open_about = function() {
    return window.location = 'about.html';
  };

  open_index = function() {
    return window.location = 'index.html';
  };

  login = function() {
    return forge.facebook.authorize(login_success, login_error);
  };

  login_success = function(token_information) {
    return forge.facebook.api('/me', {
      fields: 'name,id,username,gender,location,picture,timezone'
    }, function(user) {
      var options;
      options = {
        url: 'http://connectedworld-dev.herokuapp.com/app/login/',
        type: 'GET',
        data: {
          facebook_access_token: token_information.access_token,
          facebook_id: user.id,
          name: user.name,
          username: user.username,
          gender: user.gender,
          location: user.location.name,
          picture: user.picture.data.url,
          timezone: user.timezone
        },
        dataType: 'json',
        success: function(response) {
          logger.log(response["new"]);
          if (response["new"] === true) {
            alert('Welcome ' + response.user_name);
          }
          forge.prefs.set('user_id', response.user_id);
          forge.prefs.set('user_name', response.user_name);
          return forge.prefs.set('user_picture', response.user_picture, open_index);
        }
      };
      return forge.request.ajax(options);
    });
  };

  login_error = function(error) {
    return alert('Error: ' + error);
  };

  $(document).ready(init);

}).call(this);
