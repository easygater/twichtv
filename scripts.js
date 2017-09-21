var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "ziggy_test"];

function makeURL(type, name) {
  return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
}

function getChannels() {
  channels.forEach(function(channel) {
    console.log(channel);
    $.getJSON(makeURL('streams', channel), function(data) {
      var game, status;
      if(data.stream === null) {
        game = 'Offline';
        status = 'offline';
      } else {
        game = data.stream.game;
        status = 'online';
      }

      $.getJSON(makeURL('channels', channel), function(data) {
        var logo, name, description;
        if(data.status === 404) {
          logo = 'https://dummyimage.com/50x50/9e139e/ffffff.jpg&text=x';
          name = channel;
          description = game;
        } else {
          if(data.logo !== null) {
            logo = data.logo;
          } else {
            logo = 'https://dummyimage.com/50x50/9e139e/ffffff.jpg&text=x';
          }
          if(data.display_name !== null) {
            name = data.display_name;
          } else {
            name = channel;
          }
          if(status === 'online') {
            description = game + ': ' + data.status;
          } else {
            description = game;
          }
        }

        var html = '<div class="row ' + status + '">' +
          '<a href="https://www.twitch.tv/' + channel + '" target="_blank">' +
          '<img class="streamer-logo" src="' + logo + '" alt="logo">' +
          '<p class="streamer">' + name + '</p>' +
          '<p class="game">' + description + '</p>' + '</a></div>';

        if(status === 'online') {
          $('div.wrapper').prepend(html);
          if(channel === 'freecodecamp') {
            $('.header > a').html('Freecodecamp is ONLINE');
          }
        } else {
          $('div.wrapper').append(html);
          if(channel === 'freecodecamp') {
            $('.header > a').html('Freecodecamp is OFFLINE');
          }
        }
      });
    });
  });
}

$(document).ready(function() {
  getChannels();
  // Ensure that at least one of the buttons stay active
  // if the focus get lost
  $('.button').click(function() {
    $('.button').removeClass('active');
    $(this).addClass('active');
    var status = $(this).attr('id');
    console.log(status);
    if(status === 'all') {
      // show all rows
      $('.online, .offline').show();
    } else if(status === 'online') {
      // hide offline and show online rows
      $('.offline').hide();
      $('.online').show();
    } else {
      // hide online and show offline rows
      $('.online').hide();
      $('.offline').show();
    }
  });
});
