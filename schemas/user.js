const mongoose = require("mongoose");
const Car = require("./car.js");

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
