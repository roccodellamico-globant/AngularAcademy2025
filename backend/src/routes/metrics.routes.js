// Importar dependencias y modulos
const express = require("express");
const router = express.Router();

// Importar metodos de controladores
const metricsController = require("../controllers/metrics.controller");

// Importar middleware de auth
const authMiddelware = require("../middleware/auth.middleware");


// Definir rutas
router.get("/user", authMiddelware, metricsController.userMetrics);
//router.get("/admin", authMiddelware, metricsController.adminMetrics);

module.exports = router;