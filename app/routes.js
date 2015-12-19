var Poll = require('./models/Poll');

module.exports = function(app) {

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

	// application
	app.get('/*', function(req, res) {
		// load the home page
		res.sendfile(__dirname, 'public/index.html');
	});

};
