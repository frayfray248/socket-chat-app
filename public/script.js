$(document).ready(function(){

    // username form submit handler
    $('#usernameForm').on('submit', function(event) {
        event.preventDefault();

        const username = $('#usernameInput').val();

        socket.emit('username entered', username);

        $(this).hide();
        $('#publicChatBoard').show();
    });
  
  });