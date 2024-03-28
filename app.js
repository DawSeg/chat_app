
const loginForm = document.querySelector('.welcome-form');
const messagesSection = document.querySelector('.messages-section');
const messagesList = document.querySelector('.messages-section-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = loginForm.querySelector('.text-input');
const messageContentInput = addMessageForm.querySelector('.text-input');

let userName;

const login = (e) => {
  e.preventDefault();

  if (userNameInput.value.trim() === '') {
    alert('To pole nie może być puste!');
  } else {
    userName = userNameInput.value
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  };
}

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  login(e);
})