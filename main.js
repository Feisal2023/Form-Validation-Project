// selecting element from Dom or Pulling elements from the dom
const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');

// functions
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// check email Function
function checkEmail(input) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(emailRegex.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'invalid Email');
  }
}
// Check required function
function checkRequired(inptArr) {
  inptArr.forEach( (input)=> {
  if(input.value.trim() === '') {
    showError(input, `${getFieldName(input)} is required`)
  } else {
    showSuccess(input)
  }
  }) 
}
// check length function 
function checkLength(input, min, max) {
  if(input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if(input.value.length > max) {
    showError(input,  `${getFieldName(input)} must be less tham ${max} characters`);
  } else {
    showSuccess(input);
  }
}
// get Fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// confirm passwords matching
function confirmPasswordMatching(input1, input2) {
  if(input1.value !== input2.value) {
    showError(input2, 'password do not matching')
  } else
  showSuccess(input2);
}
// Event Listeners

form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkRequired([username, email, password, confirmPassword]);
  checkLength(username, 3, 15);
  checkLength(password, 8, 20);
  checkEmail(email);
  confirmPasswordMatching(password, confirmPassword)
})

