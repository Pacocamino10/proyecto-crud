const { Router } = require("express");
const Taller = require("../schemas/taller.js");
const router = Router();

// Endpoint para obtener todos los talleres
router.get("/", async (req, res) => {
  try {
    const talleres = await Taller.find();
    res.json(talleres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint para crear un nuevo taller
router.post("/", async (req, res) => {
  const { nombre, especialidad, diasLibres } = req.body;

  try {
    const taller = new Taller({
      nombre,
      especialidad,
      diasLibres,
    });

    await taller.save();
    res.status(201).json(taller);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint para obtener un taller por su ID
router.get("/:especialidad", async (req, res) => {
  const { especialidad } = req.params;

  try {
    const taller = await Taller.find({ especialidad: especialidad });
    res.json(taller);
  } catch (error) {
    res.status(404).json({ message: "Taller no encontrado" });
  }
});

// Endpoint para actualizar un taller
router.put("/:tallerId", async (req, res) => {
  const { tallerId } = req.params;
  const { nombre, especialidad, diasLibres } = req.body;

  try {
    const taller = await Taller.findByIdAndUpdate(
      tallerId,
      { nombre, especialidad, diasLibres },
      { new: true }
    );

    res.json(taller);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint para eliminar un taller
router.delete("/:tallerId", async (req, res) => {
  const { tallerId } = req.params;

  try {
    await Taller.findByIdAndDelete(tallerId);
    res.json({ message: "Taller eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Endpoint para reservar una cita en el taller
router.post("/:tallerId/citas", async (req, res) => {
  const { tallerId } = req.params;
  const { fecha, userId, carId } = req.body;

  try {
    const taller = await Taller.findById(tallerId);

    // Verificar si el taller tiene disponibilidad en la fecha solicitada
    if (taller.diasLibres.includes(fecha)) {
      return res
        .status(400)
        .json({
          message: "El taller no está disponible en la fecha solicitada",
        });
    }

    // Crear la cita
    const cita = {
      fecha,
      usuario: userId,
      coche: carId,
    };
    taller.diasLibres.filter((dia) => dia != fecha).citas.push(cita);
    
    await taller.save();

    res.status(201).json(cita);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
