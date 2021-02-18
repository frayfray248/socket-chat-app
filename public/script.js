$(document).ready(function(){

    var clientUserName = '';

    // username form submit handler
    $('#usernameForm').on('submit', function(event) {
        event.preventDefault();

        const username = $('#usernameInput').val();
        clientUserName = $('#usernameInput').val();

        socket.emit('username entered', username);

        $('#landing').hide();
        $('#publicChatBoard').show();
    });

    // message form event handler
    $('#messageForm').on('submit', function(event) {
        event.preventDefault();

        const $messageInput = $('#messageInput');

        const message = $messageInput.val();

        socket.emit('message entered', message);

        $('#publicChatBoard tbody').append(`
            <tr>
                <th class="text-right">${clientUserName}</th>
                <td class="text-left">${message}</td>
            </tr>
        `);

        // set scroll top to bottom
        const chatBoardElement = $('#chatBoard')[0];
        chatBoardElement.scrollTop = chatBoardElement.scrollHeight;

        $messageInput.val('');
    });


    // update messages event handler
    socket.on('update messages', function(data) {
        $('#publicChatBoard tbody').empty();

        for (const userMessage of data) {

            $('#publicChatBoard tbody').append(`
                <tr>
                    <th class="text-right">${userMessage.username}</th>
                    <td class="text-left">${userMessage.message}</td>
                </tr>
            `);
            
        }
    });

    
  
  });