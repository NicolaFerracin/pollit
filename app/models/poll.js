var mongoose = require('mongoose');

var Answer = {
	id : {type: Number, min: 0},
	text : String,
	votes : {type: Number, min: 0}
};

module.exports = mongoose.model('Poll', {
	question : String,
	answers : [Answer],
	author : String
});
