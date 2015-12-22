var Poll = require('./models/Poll');
var User = require('./models/user');

module.exports = function(app, passport) {

	// api ---------------------------------------------------------------------
	// create poll
	app.post('/api/polls', function(req, res) {
		console.log("asdsa")
		Poll.create({
			question : req.body.question,
			answers : req.body.answers,
			author : req.body.author
		}, function(err, poll) {
			if (err) {
				res.send(err);
			}
			res.json(poll);
		});
	});

	// get all polls
	app.get('/api/polls', function(req, res) {
		// use mongoose to get all polls from the db
		Poll.find(function(err, polls) {
			// if err, send it
			if (err) {
				res.send(err);
			}
			res.json(polls);
		});
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	/*
	app.get('/login', function(req, res) {

	// render the page and pass in any flash data if it exists
	res.render('login.ejs', { message: req.flash('loginMessage') });
});
*/

// process the login form
// Express Route with passport authentication and custom callback
app.post('/api/login', function(req, res, next) {
	passport.authenticate('local-login', function(err, user, info) {
		if (err) {
			return next(err);
		}
		if (user === false) {
			res.status(401).send(req.flash('loginMessage'));
		} else {
				req.login(user, function(err) {
					if (err) {
						res.status(500).send("There has been an error");
					} else {
						res.status(200).send("success!");
					}
				});
			}
	})(req, res, next);
});

// process the signup form
// Express Route with passport authentication and custom callback
app.post('/api/signup', function(req, res, next) {
	passport.authenticate('local-signup', function(err, user, info) {
		if (err) {
			return next(err);
		}
		if (user === false) {
			res.status(401).send(req.flash('signupMessage'));
		} else {
			res.status(200).send("success!");
		}
	})(req, res, next);
});

app.get('/loggedin', function(req, res) {
	if (req.isAuthenticated()) {
		res.send(req.user.local.email)
	}
	else {
		res.send(undefined);
	}
});

// =====================================
// LOGOUT ==============================
// =====================================
app.get('/logout', function(req, res) {
	console.log("logout")
	req.logout();
	res.redirect('/');
});
};
