var Poll = require('./models/Poll');

module.exports = function(app) {

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
};
