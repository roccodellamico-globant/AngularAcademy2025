// Importar dependencias y modulos
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// Crear servidor node
const app = express();

// Configurar cors --> ejecuta cors antes de ejecutar una ruta
app.use(cors());
// Convertir body a obj js
app.use(express.json());

// Cargar configuracion de rutas
const authRoutes = require("./src/routes/auth.routes");
const metricsRoutes = require("./src/routes/metrics.routes");

// Rutas de la API
app.use("/api/auth", authRoutes);
app.use("/api/metrics", metricsRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Backend corriendo en el puerto ${process.env.PORT}`);
});


