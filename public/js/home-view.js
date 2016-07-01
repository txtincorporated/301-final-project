(function(module) {
  var HomeView = {};
  var $tatus = $('#status');
  HomeView.initHomeView = function (ctx, next) {
    console.log('initHomeView called');
    var eventHash = $('#event').data('eventhash');
    var userHash = $('#user-id').data('userhash');
    $('#event-name').text($('#event').data('eventname'));
    $('#user-id h4').text($('#user-id').data('username'));
    // if (next) next();
    $.ajax({
      url: '/api/rsvps/' + eventHash + '/' + userHash,
      type: 'GET',
      cache: false
    })
    .done(function(data) {
      console.log(data); //TODO: This function should, when done, persist attendance state. I'm getting an object but it's always the same.
      if (data.status == 1) {$tatus.addClass('maybe');
      } else if (data.status == 2) {$tatus.addClass('approve');
      } else if(data.status == -1) {$tatus.addClass('approve');}
    });
    if (next) next();
  };

  $tatus.on('click', function() {
    $.ajax({
      url: '/api/rsvps/' + eventHash + '/' + userHash,
      type: 'GET',
      cache: false
    });
    //Cycle through a collection of states.
    if ($tatus.hasClass('blank')) { //If blank -> maybe
      $tatus.toggleClass('blank maybe');
      $tatus.children().text('Maybe');
      $('#status-instructions').remove();
      //Send state to backend
    } else if ($tatus.hasClass('maybe')) { //If maybe -> going
      $tatus.toggleClass('maybe approve');
      $tatus.children().text('Yep');
      //Send state to backend
    } else if ($tatus.hasClass('approve')) { //if going -> not going
      $tatus.toggleClass('approve disapprove');
      $tatus.children().text('Nope');
      //Send state to backend
    } else if ($tatus.hasClass('disapprove')) { //if not going -> blank
      $tatus.toggleClass('disapprove blank');
      $tatus.children().text('Going?');
      //Send state to backend
    }
  });
  module.HomeView = HomeView;
})(window);
