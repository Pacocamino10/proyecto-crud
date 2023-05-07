const { Router } = require("express");
const Car = require("../schemas/car.js");
const User = require("../schemas/user.js");
const router = Router();
// ver todos los coches
router.get("/cars", async (req, res) => {
  try {
    const cars = await Car.find().populate("propietario");
    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los coches" });
  }
});


// Crear coche
router.post("/newcar", async (req, res) => {
  try {
    const { marca, modelo, averia, propietario } = req.body;

    const car = new Car({
      marca,
      modelo,
      averia,
      propietario,
    });

    await car.save();

    // Actualiza el campo "cars" del propietario utilizando "populate"
    await User.findByIdAndUpdate(propietario, { $push: { cars: car._id } }).populate(
      "cars"
    );

    res.json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el coche" });
  }
});

module.exports = router;
