$(document).ready(function(){

    // username form submit handler
    $('#usernameForm').on('submit', function(event) {
        event.preventDefault();

        const username = $('#usernameInput').val();

        socket.emit('username entered', username);

        $(this).hide();
        $('#publicChatBoard').show();
    });

    // update messages event
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