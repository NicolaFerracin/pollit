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
app.post('/login', passport.authenticate('local-login', {
	successRedirect : '/newPoll', // redirect to the secure profile section
	failureRedirect : '/', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));

// =====================================
// SIGNUP ==============================
// =====================================
// show the signup form
/*
app.get('/signup', function(req, res) {

// render the page and pass in any flash data if it exists
res.render('signup.ejs', { message: req.flash('signupMessage') });
});
*/

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


/*
// process the signup form
app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/',
        failureRedirect : '/signup',
				failureFlash: true
			}));
			*/

// =====================================
// LOGOUT ==============================
// =====================================
app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
	return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
