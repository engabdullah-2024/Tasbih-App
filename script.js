// Elements
const regForm = document.getElementById('registration-form');
const loginForm = document.getElementById('login-form');
const tasbihApp = document.getElementById('tasbih-app');
const displayUsername = document.getElementById('display-username');

// Registration Inputs
const regName = document.getElementById('reg-name');
const regEmail = document.getElementById('reg-email');
const regUsername = document.getElementById('reg-username');
const regPassword = document.getElementById('reg-password');

// Login Inputs
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');

// Load saved count from local storage
let count = localStorage.getItem('tasbihCount') ? parseInt(localStorage.getItem('tasbihCount')) : 0;
const countDisplay = document.getElementById('count');
countDisplay.textContent = count;

// Register Button
document.getElementById('register-btn').addEventListener('click', () => {
  if (!regName.value || !regEmail.value || !regUsername.value || !regPassword.value) {
    alert('Please fill out all fields.');
    return;
  }

  const userData = {
    name: regName.value,
    email: regEmail.value,
    username: regUsername.value,
    password: regPassword.value,
  };

  localStorage.setItem('userData', JSON.stringify(userData));
  alert('Registration Successful! Please login.');

  regForm.style.display = 'none';
  loginForm.style.display = 'block';
});

// Login Button
document.getElementById('login-btn').addEventListener('click', () => {
  const savedUser = JSON.parse(localStorage.getItem('userData'));

  if (!loginUsername.value || !loginPassword.value) {
    alert('Please enter your username and password.');
    return;
  }

  if (
    loginUsername.value === savedUser.username &&
    loginPassword.value === savedUser.password
  ) {
    displayUsername.textContent = savedUser.name;
    loginForm.style.display = 'none';
    tasbihApp.style.display = 'block';
  } else {
    alert('Invalid username or password.');
  }
});

// Logout Button
document.getElementById('logout-btn').addEventListener('click', () => {
  // Clear the local storage
  localStorage.removeItem('userData');

  // Reset the display
  tasbihApp.style.display = 'none';
  loginForm.style.display = 'block';

  // Keep the username and password fields visible after logout
  loginUsername.value = ''; // Clear the value so user can re-enter
  loginPassword.value = ''; // Clear the value so user can re-enter
});

// Counter Functionality
const updateCountDisplay = () => {
  countDisplay.textContent = count;
  localStorage.setItem('tasbihCount', count);
};

document.getElementById('increase').addEventListener('click', () => {
  count++;
  updateCountDisplay();
});

document.getElementById('decrease').addEventListener('click', () => {
  if (count > 0) {
    count--;
  }
  updateCountDisplay();
});

document.getElementById('reset').addEventListener('click', () => {
  count = 0;
  updateCountDisplay();
});
