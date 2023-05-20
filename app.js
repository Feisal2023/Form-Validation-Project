// selecting elements from Dom / Pulling elements from dom
const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');
const loginBtn = document.querySelector('.login-btn');
const container = document.querySelector('.container');

// Functions 
// showError function
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// showSuccess function
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// checkRequired function
function checkRequired(inptArr) {
  inptArr.forEach( (input) => {
    if(input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`)
    } else {
      showSuccess(input);
    };
  });
};

// getFieldName function
function getFieldName(input) {
 return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
// checkLength function
function checkLength(input, min, max) {
  if(input.value.length < min) {
    showError(input, `${getFieldName(input)} must be atleast ${min} characters`);
  } else if(input.value.length > max) {
    showError(input, `${getFieldName(input)} must be atmost ${max} characters`);
  } else {
    showSuccess(input);
  }
}
// checkEmail
function checkEmail(input) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(emailRegex.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Invalid Email');
  }
}
// confirm password matching 
function confirmPasswordMatching(p1, p2) {
  if(p1.value.length === p2.value.length) {
    showSuccess(p2);
  } else {
   showError(p2, 'password do not matching');
  }
}
function toggleContainerVisibility() {
  container.classList.toggle('show');
}

loginBtn.addEventListener('click', () => {
  toggleContainerVisibility();
});


// Events listener
form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkRequired([username, email, password, confirmPassword]);
  checkLength(username, 3, 15);
  checkLength(password,  8,  20);
  checkEmail(email);
  confirmPasswordMatching(password, confirmPassword);
  const isSuccess = document.querySelector('.form-control.success').length === 4;
  if(isSuccess) {
    container.style.display = 'none';
  } else {
   toggleContainerVisibility();
  }
    
});