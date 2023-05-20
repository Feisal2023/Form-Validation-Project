// selecting elements from Dom / Pulling elements from dom
const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');
const loginBtn = document.querySelector('.login-btn');
const container = document.querySelector('.container');
const eyeIcon = document.querySelector('.toggle-img-1');
const eyeIcon2 = document.querySelector('.toggle-img-2');

// Functions 
eyeIcon.onclick = function () {
  if(password.type == "password") {
    password.type = 'text'; 
    eyeIcon.src = 'img/eye-open.png';
  } else {
    password.type = 'password';
    eyeIcon.src = 'img/eye-close.png';
  }

}
eyeIcon2.onclick = function () {
  if(confirmPassword.type == "password") {
    confirmPassword.type = 'text'; 
    eyeIcon2.src = 'img/eye-open.png';
  } else {
    confirmPassword.type = 'password';
    eyeIcon2.src = 'img/eye-close.png';
  }

}

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
  container.classList.add('show');

}

loginBtn.addEventListener('click', () => {
  // container.classList.add('show');
  toggleContainerVisibility()
});


// Events listener
form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkRequired([username, email, password, confirmPassword]);
  checkLength(username, 3, 15);
  checkLength(password,  8,  20);
  checkEmail(email);
  confirmPasswordMatching(password, confirmPassword);
  const hasError = document.querySelector('.form-control.error');

  if (hasError) {
    container.classList.add('show');
  } else {
    container.classList.add('hidden');
       // Show success message and hide login button
       const successBox = document.createElement('div');
       successBox.classList.add('success-box');
       successBox.innerHTML = `
         <i class="fa fa-check"></i>
         <p>Successfully logged in!</p>
       `;
       document.body.appendChild(successBox);
   
       loginBtn.classList.add('hidden');
       
       // Delay hiding the success message and showing the login button again
       setTimeout(() => {
         successBox.remove();
         loginBtn.classList.remove('hidden');
       }, 3000);
  }
    
});