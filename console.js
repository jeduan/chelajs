var repl = require("repl");

var terminal = repl.start({
	prompt: "ChelaJs > ",
	input: process.stdin,
	output: process.stdout
});

terminal.context.db = require('./lib/db');
terminal.context.users = require('./app/collections/users');

terminal.context.kill = function () {
	process.kill();
};
