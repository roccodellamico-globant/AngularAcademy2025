// Importar dependencias y modulos
const express = require("express");
const router = express.Router();

// Importar metodos de controladores
const { getUserMetrics, getAdminMetrics } = require("../controllers/metrics.controller");
// Importar middleware de auth
const { authMiddleware } = require("../middleware/auth.middleware");

// Definir rutas
router.get("/user", authMiddleware, getUserMetrics);
router.get("/admin", authMiddleware, getAdminMetrics);


module.exports = router;
