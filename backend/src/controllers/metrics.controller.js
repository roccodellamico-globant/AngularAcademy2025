const metricsService = require("../services/metrics.service");

const getUserMetrics = async (req, res) => {
    try {
        const { id } = req.user;

        const metrics = await metricsService.getUserMetrics(id);

        return res.status(200).json({
            message: "User metrics",
            metrics
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            error: "Please try again later",
        });
    }
};

const getAdminMetrics = async (req, res) => {
    try {

        const metrics = await metricsService.getAdminMetrics();

        return res.status(200).json({
            message: "Admin metrics",
            metrics
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            error: "Please try again later",
        })
    }
};

module.exports = { 
    getUserMetrics, 
    getAdminMetrics 
};
