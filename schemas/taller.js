const mongoose = require('mongoose');
const Car = require("./car.js");
const User = require('./user.js');


const tallerSchema = new mongoose.Schema({
	nombre: String,
	especialidad: String,
	diasLibres: [String], // Agregar campo para los días libres del taller
	citas: [
	  {
		fecha: Date,
		usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		coche: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' }
	  }
	]
	
	
});

const Taller = mongoose.model('Taller', tallerSchema);

module.exports = Taller;
