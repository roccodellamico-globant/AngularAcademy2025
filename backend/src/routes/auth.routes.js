// Importar dependencias y modulos
const express = require("express");
const router = express.Router();

// Importar metodos de controladores
const { login, register, me } = require("../controllers/auth.controller");

// Importar middleware de auth
const { authMiddleware } = require("../middleware/auth.middleware");


// Definir rutas
router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, me);

module.exports = router;
