import './confetti';

import Clipboard from 'clipboard';
import generatePassword from './generator';

// Set up the textbox where password output will be displayed
const passwordTextbox = document.getElementById('password');
const clipboard = new Clipboard(passwordTextbox);
clipboard.on('success', function(e) {
    // TODO: Show tooltip
    // Hide on textbox blur
});

// Generate a password and update the textbox
function newPassword() {
    passwordTextbox.value = generatePassword();
}

// Attach to the generate button
document.getElementById('generate').addEventListener('click', function(e) {
    e.preventDefault();
    newPassword();
});

// Generate the initial password
newPassword();
