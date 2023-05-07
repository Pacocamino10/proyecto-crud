const { Router } = require("express");
const User = require("../schemas/user.js");
const Car = require("../schemas/car.js");
const router = Router();
// ver todos los usuarios
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().populate('cars');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});
// Crear un usuario
router.post("/newuser", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});
// ver todos los coches por usuario
router.get("/:nombre/cars", async (req, res) => {
  try {
    const user = await User.findOne({ nombre: req.params.nombre }).populate('cars');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user.cars);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
