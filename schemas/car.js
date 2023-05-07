const mongoose = require('mongoose');
const User = require('./user.js');

const carSchema = new mongoose.Schema({
	marca: {
		type: String,
		required: true
	  },
	modelo:{
		type: String,
		required: true
	  },
	averia: {
		type: String,
		required: true
	  },
	propietario: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	  }
	
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
