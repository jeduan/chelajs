var passport = require('passport'),
	GitHubStrategy = require('passport-github').Strategy,
	conf = require('../../conf');

var users = require('../collections/users');

var connection = function (server) {
	passport.use(new GitHubStrategy({
			clientID: conf.github.clientID,
			clientSecret: conf.github.clientSecret,
			callbackURL: conf.github.callbackURL
		},
		function(accessToken, refreshToken, profile, done) {
			// Profile
			profile.provider = "github";
			profile.accessToken = accessToken;
			profile.data = profile._json;
			delete profile._raw;
			delete profile._json;

			console.log('Creating', profile.username);

			users.put(profile.username, profile, function (err) {
				if(err){
					done(err, null);
					return;
				}

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