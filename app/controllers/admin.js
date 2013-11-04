var Controller = require('../../lib/controller'),
	_ = require('underscore'),
	conf = require('../../conf');

var users = require('../collections/users');

var adminController = Controller({
	path : "admin"
});

adminController.beforeEach(function(req, res, next){
	req.data = {};

	res._render = res.render;
	res.render = function(view, data){
		data = data || {};
		data = _.extend(data, req.data);

		res._render(view, data);
	};

	// Validates that user is an admin in the conf file
	if(req.session && req.session.passport && req.session.passport.user && conf.admins.indexOf(req.session.passport.user.username) >= 0){
		req.data.user = req.session.passport.user;
		next();
	}else{
		res.redirect('/');
	}
});

adminController.get('', function (req, res) {
	res.render('admin/home');
});

adminController.get('/users', function (req, res) {
	users.fetch(function(err, data){
		res.render('admin/users',{
			users : data
		});
	});
});

module.exports = adminController;