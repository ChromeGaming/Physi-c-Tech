// Add this to a new file chatbot.js

document.getElementById('chatbot-send').addEventListener('click', sendMessage);
document.getElementById('chatbot-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
});

function toggleChatbot() {
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotLogo = document.getElementById('chatbot-logo');
    if (chatbotContainer.style.display === 'none' || chatbotContainer.style.display === '') {
        chatbotContainer.style.display = 'flex';
        chatbotLogo.style.display = 'none';
    } else {
        chatbotContainer.style.display = 'none';
        chatbotLogo.style.display = 'flex';
    }
}

function sendMessage() {
    const inputField = document.getElementById('chatbot-input');
    const message = inputField.value.trim();
    if (message === '') return;

    displayMessage('User', message);
    inputField.value = '';

    // Simple keyword-based responses
    let response = 'Sorry, I did not understand that.';

    if (message.toLowerCase().includes('goal of the game')) {
        response = '"Physi-c-Tech" seems to be a play on words combining "physics" and "technology," , Where we create elements after adding two different elements.';
    } else if (message.toLowerCase().includes('start a new game')) {
        response = 'To start a new game, click on the "New Game" button in the home page. And if you want to continue from where you left just click on continue button.';
    } else if (message.toLowerCase().includes('about section')) {
        response = 'You can find the "About" section by clicking on the "About" link at the top of the page.';
    } else if (message.toLowerCase().includes('Sound on or off')) {
        response = 'If you want to on or off the sound then click on the sound button.';
    } else if (message.toLowerCase().includes('game isn\'t loading')) {
        response = 'If the game isn\'t loading, try refreshing the page or clearing your browser\'s cache. If the problem persists, contact support at [support email].';
    } else if (message.toLowerCase().includes('report a bug')) {
        window.location.href = 'https://github.com/ChromeGaming/Physi-c-Tech/issues/new?assignees=&labels=&projects=&template=bug_report.yml&title=%5BBug%5D%3A+';
        return; // Stop further execution
    } else if (message.toLowerCase().includes('feedback')) {
        window.location.href = 'https://chromegaming.github.io/Physi-c-Tech/feedback.html';
        return; // Stop further execution
    }

    displayMessage('Bot', response);
}

function displayMessage(sender, message) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');

    // Create separate spans for sender and message content
    const senderSpan = document.createElement('span');
    senderSpan.textContent = `${sender}: `;
    senderSpan.classList.add('sender');

    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;

    // Append sender and message spans to the message element
    messageElement.appendChild(senderSpan);
    messageElement.appendChild(messageSpan);

    // Assigning classes based on sender
    if (sender === 'User') {
        messageElement.classList.add('user');
    } else if (sender === 'Bot') {
        messageElement.classList.add('bot');
    }

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}


