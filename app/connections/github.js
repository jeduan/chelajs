var passport = require('passport'),
	GitHubStrategy = require('passport-github').Strategy,
	conf = require('../../conf')
	;

var connection = function (server) {
	passport.use(new GitHubStrategy({
			clientID: conf.github.clientID,
			clientSecret: conf.github.clientSecret,
			callbackURL: conf.github.callbackURL
		},
		function(accessToken, refreshToken, profile, done) {
			process.nextTick(function () {
				return done(null, profile);
			});
		}
	));

	server.get('/auth/github', passport.authenticate('github') );

	server.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/?login-failed=true' }),
	function(req, res) {
		res.redirect('/');
	});
};

module.exports = connection;