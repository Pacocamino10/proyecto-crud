const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
const users = require("./routes/userRoute.js");
const cars = require("./routes/carRoute.js");
const talleres = require("./routes/tallerRoute.js");


app.use(express.json())
app.use(morgan("combined"));
app.use('/api/users', users);
app.use('/api/cars', cars);
app.use('/api/talleres', talleres);


const url = "mongodb://127.0.0.1:27017/practice-taller";
// conexion a la base de datos
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((error) => console.error("Error al conectar a MongoDB:", error));

// Iniciar el servidor
app.listen(3001, () => {
  console.log("Servidor iniciado en el puerto 3001");
});

module.exports = app;