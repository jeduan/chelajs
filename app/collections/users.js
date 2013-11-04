var collections = require('../../lib/collection');

var users = collections.sublevel('users');

users.fetch = function (callback) {
	var usersArray = [];

	users.createValueStream()
	.on('data', function(data){
		usersArray.push(data);
	})
	.on('end', function(){
		callback(null, usersArray);
	})
	.on('error', function(err){
		callback(err, null);
	});
};

module.exports = users;