var global = this;

(function(global) {

	console.info(' ');
	console.info('-----------------------------------------');
	console.info('| ID:          ' + _.padEnd(Ti.App.id, 25) + '|');
	console.info('| Name:        ' + _.padEnd(Ti.App.name, 25) + '|');
	console.info('| Version:     ' + _.padEnd(Ti.App.version, 25) + '|');
	console.info('| Deployment:  ' + _.padEnd(Ti.App.deployType, 25) + '|');
	console.info('-----------------------------------------');
	console.info(' ');

	// Code that you want to run upon app startup goes here!

	// Running some feature tests
	require("test-es6-arrows");
	// require("test-es6-object-literals");
	require("test-es6-template-strings");
	require("test-es6-destructuring");
	require("test-es6-default-rest-spread");
	require("test-es6-let-const");

})(global);