$(document).ready(function(){

    var clientUserName = '';

    // username form submit handler
    $('#usernameForm').on('submit', function(event) {
        event.preventDefault();

        const username = $('#usernameInput').val();
        clientUserName = $('#usernameInput').val();

        socket.emit('username entered', username);

        $(this).hide();
        $('#publicChatBoard').show();
    });

    // message form event handler
    $('#messageForm').on('submit', function(event) {
        event.preventDefault();

        const message = $('#messageInput').val();

        socket.emit('message entered', message);

        $('#publicChatBoard tbody').append(`
            <tr>
                <th>${clientUserName}</th>
                <td>${message}</td>
            </tr>
        `);
    });


    // update messages event handler
    socket.on('update messages', function(data) {
        $('#publicChatBoard tbody').empty();

        for (const userMessage of data) {

            $('#publicChatBoard tbody').append(`
                <tr>
                    <th>${userMessage.username}</th>
                    <td>${userMessage.message}</td>
                </tr>
            `);
            
        }
    });

    
  
  });