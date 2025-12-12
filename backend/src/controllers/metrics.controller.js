const metricsModel = require("../models/metrics.model");

const getUserMetrics = async (req, res) => {
    try {
        const { id } = req.user;

        const metrics = await metricsModel.getUserMetrics(id);

        return res.status(200).json({
            message: "User metrics",
            metrics
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

module.exports = { getUserMetrics };
