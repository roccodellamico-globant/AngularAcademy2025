// Importar el modelo
const metricsModel = require("../models/metrics.model");

const userMetrics = async (req, res) => {
    const { id } = req.user;

    //TODO hacer consulta ultimo login y catidad de logins

    res.status(200).json({
        message: "User metrics",
        metrics
    });
};