var Poll = require('./models/Poll');
var User = require('./models/user');

module.exports = function(app, passport) {

	// api ---------------------------------------------------------------------
	// create poll
	app.post('/api/polls', function(req, res) {
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

	// get polls by user
	app.get('/api/polls/:username', function(req, res) {
			// use mongoose to get all polls from the db
			Poll.find({ author : req.params.username }, function(err, polls) {
				// if err, send it
				if (err) {
					res.send(err);
				}
				res.json(polls);
			});
	});

	// get poll by id
	app.get('/api/poll/:id', function(req, res) {
		// use mongoose to find the poll by id requested
		Poll.findById(req.params.id, function(err, poll) {
			if(err) {
				res.send(err);
			}
			res.json(poll);
		});
	});

	// update a Poll
	app.post('/api/polls/:id', function(req, res) {
		Poll.findById(req.body._id, function(err, poll) {
			if(err) {
				res.send(err);
			}
			poll.answers = req.body.answers;
			poll.votes = req.body.votes;
			poll.save(function (err) {
				if (err) {
					res.send(err);
				}
				res.json(poll);
			});
		});
	});

	// delete a poll
	app.delete('/api/polls/:id', function(req, res) {
		Poll.remove({
			_id : req.params.id
		},
		function(err, poll) {
			if (err) {
				res.send(err);
			}
			res.send();
		});
	});

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
		var user = {};
		if (req.isAuthenticated()) {
			user.isLoggedIn = true;
			user.email = req.user.local.email;
		}
		else {
			user.isLoggedIn = false;
			user.email = undefined;
		}
		res.json(user);
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};
