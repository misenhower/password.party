require('./confetti.js');

var Clipboard = require('clipboard');

var outputTextBox = jQuery('#password-output');
var generateButton = jQuery('#generate-btn');
var toolTipContainer = outputTextBox.parent();

toolTipContainer.tooltip({
	title: 'Copied!',
	trigger: 'manual',
	placement: 'right',
});

function generate(length)
{
	var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	var n = charset.length;
	var result = '';

	for (var i = 0; i < length; i++)
		result += charset.charAt(Math.floor(Math.random() * n));

	return result;
}

function newPassword()
{
	var password = generate(16);
	outputTextBox.val(password);
}

generateButton.click(function() {
	newPassword();
});

outputTextBox.on('blur', function() {
	toolTipContainer.tooltip('hide');
});

var clipboard = new Clipboard('#password-output');
clipboard.on('success', function(e) {
	toolTipContainer.tooltip('show');
});

newPassword();
