// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var port  	 = process.env.PORT || 8080; 				// set the port
var database = require('./config/database'); 			// load the database config
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuration ===============================================================
mongoose.connect(database.url); 	// connect to mongoDB database on modulus.io


app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/stylesheets'));
app.use(express.static(__dirname + '/javascripts'));
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request



// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);

/*
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');

require('./config/passport')(passport); // pass passport for configuration

app.use(cookieParser()); // read cookies (needed for auth)

// required for passport
app.use(session({secret : 'imsuperman'})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes
require('./app/routes.js')(app, passport);
*/
