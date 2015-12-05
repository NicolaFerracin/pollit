var mongoose = require('mongoose');

var Answer = {
	text : String,
	votes : {type: Number, min: 0}
};

module.exports = mongoose.model('Poll', {
	question : String,
	answers : [Answer],
	views : {type: Number, min: 0},
	author : String
});
