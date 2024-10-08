const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const confirm_password_input = document.getElementById('confirm-password');
const error_message = document.getElementById('error-message'); // Make sure this is correct

console.log(form);

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form from submitting
    let errors = [];

    if(firstname_input){
        // If we have a firstname-input then we are at the signup page
        errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, confirm_password_input.value);
    }
    else{
        // If we have no firstname-input then we are at the login
        errors = getLoginFormErrors(email_input.value, password_input.value);
    }

    if(errors.length > 0){
        e.preventDefault();
        error_message.innerText = errors.join('. ');
    }
});

// Function to handle signup form errors
function getSignupFormErrors(firstname, email, password, confirm_password) {
    let errors = [];

    if(firstname === '' || firstname == null){
        errors.push('Firstname is required');
        firstname_input.parentElement.classList.add('incorrect');
    }

    if(email === '' || email == null){
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    }

    if(password === '' || password == null){
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    }

    if(password.length < 8) {
        errors.push('Password must be at least 8 characters');
        password_input.parentElement.classList.add('incorrect');
    }

    if(password !== confirm_password) {
        errors.push('Password does not match');
        confirm_password_input.parentElement.classList.add('incorrect');
    }

    return errors;
}

const allinputs = [firstname_input, email_input, password_input, confirm_password_input].filter(input => input !== null);

allinputs.forEach(input => {
    input.addEventListener('input', () => {
        if(input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect');
            error_message.innerText = '';
        }
    });
});
