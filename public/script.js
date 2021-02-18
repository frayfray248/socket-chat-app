$(document).ready(function(){

    var username = '';

    // username form submit handler
    $('#usernameForm').on('submit', function(event) {
        event.preventDefault();

        username = $('#usernameInput').val();

        $(this).hide();
        $('#publicChatBoard').show();
    });
  });