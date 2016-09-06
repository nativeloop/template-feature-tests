module.exports = (() => {

	// Example from: https://babeljs.io/docs/learn-es2015/

	// Basic literal string creation
	`This is a pretty little template string.`

	// Multiline strings
	var multi = `In ES5 this is
 	not legal.`

	console.log('[test-es6-template-strings] multi: ' + multi);

	// Interpolate variable bindings
	var name = "Bob",
		time = "today";
	`Hello ${name}, how are you ${time}?`

	console.log("[test-es6-template-strings] name: " + name);

	// Unescaped template strings
	// String.raw `In ES5 "\n" is a line-feed.`


})();