var express = require('express.io'),
	swig = require('swig'),
	passport = require('passport');

var LevelStore = require('connect-level')(express);

var server = express();

// View engine
swig.setDefaults({
	root: './app/views',
	cache : false
});
server.engine('html', swig.renderFile);
server.set('view engine', 'html');
server.set('views', __dirname + '/app/views');
server.set('view cache', false);

// Server config
server.configure(function() {
	server.use(express.logger());
	server.use(express.cookieParser());
	server.use(express.bodyParser());

	server.use(express.session({
		store: new LevelStore(),
		secret: 'super sekkrit'
	}));

	server.use(passport.initialize());
	server.use(passport.session());
});

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

// Server routes
server.get('/', function (req, res) {
	res.render('home',{
		user : req.session.passport.user
	});
});

// Connections
var githubConnection = require('./app/connections/github');
githubConnection(server);

server.listen(3000);