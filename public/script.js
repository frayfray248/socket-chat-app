$(document).ready(function () {

    var clientUserName = '';

    // username form submit handler
    $('#usernameForm').on('submit', function (event) {
        event.preventDefault();

        const username = $('#usernameInput').val();
        clientUserName = $('#usernameInput').val();

        socket.emit('username entered', username);

        $('#landing').hide();
        $('#publicChatBoard').show();
    });

    // clear all messages from chat board
    function clearMessages() { $('#publicChatBoard tbody').empty() };

    // add a user's message to the chat board
    function addUserMessage(userMessage) {
        $('#publicChatBoard tbody').append(`
            <tr>
                <th class="text-right">${userMessage.username}</th>
                <td class="text-left">${userMessage.message}</td>
            </tr>
        `);
    }

    // message form event handler
    $('#messageForm').on('submit', function (event) {
        event.preventDefault();

        const $messageInput = $('#messageInput');

        const message = $messageInput.val();

        socket.emit('message entered', message);

        addUserMessage({username: clientUserName, message})

        // set scroll top to bottom
        const chatBoardElement = $('#chatBoard')[0];
        chatBoardElement.scrollTop = chatBoardElement.scrollHeight;

        $messageInput.val('');
    });


    // update messages event handler
    socket.on('update messages', function (data) {
        clearMessages();

        for (const userMessage of data) { addUserMessage(userMessage)};
    });
});