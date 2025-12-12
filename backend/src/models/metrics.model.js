const db = require("../config/db");

const getUserMetrics = async (id) => {
    const query = "SELECT last_login, login_count FROM users WHERE id = ?";

    const queryResult = await db.query(query, [id]);
    const result = queryResult[0];

    return result;
};

module.exports = {
    getUserMetrics,
};