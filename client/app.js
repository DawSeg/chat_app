
const logInForm = document.querySelector('.welcome-form');
const messagesSection = document.querySelector('.messages-section');
const messagesList = document.querySelector('.messages-section__list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = logInForm.querySelector('.text-input');
const messageContentInput = addMessageForm.querySelector('.text-input');

const socket = io();
socket.on('message', ({ author, content }) => addMessage(author, content))

let userName;

const logIn = e => {
  e.preventDefault();

  if (userNameInput.value.trim() === '') {
    alert('To pole nie może być puste!');
  } else {
    userName = userNameInput.value
    logInForm.classList.remove('show');
    messagesSection.classList.add('show');
  };
};

logInForm.addEventListener('submit', e => {
  e.preventDefault();
  logIn(e);
});


const addMessage = (author, content) => {
  const message = document.createElement('li');
  message.classList.add('message', 'message-received');

  if (author === userName) {
    message.classList.add('message--self');
  };

  message.innerHTML = `
  <h3 class="message__author">${userName === author ? 'You' : author}</h3>
  <div class="message__content">
    ${content}
  </div>
  `;
  messagesList.appendChild(message);
};

const sendMessage = e => {
  e.preventDefault();
  let messageContentValue = messageContentInput.value;

  if (messageContentValue.trim() === '') {
    alert('To pole nie może być puste!');
  } else {
    addMessage(userName, messageContentValue);
    socket.emit('message', { author: userName, content: messageContentValue })
    messageContentValue = ''
  };
};

addMessageForm.addEventListener('submit', e => {
  e.preventDefault();
  sendMessage(e);
});