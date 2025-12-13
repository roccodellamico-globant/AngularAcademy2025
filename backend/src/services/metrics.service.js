const db = require("../config/db");

const getUserMetrics = async (id) => {
    const query = "SELECT last_login, login_count FROM users WHERE id = ?";

    const queryResult = await db.query(query, [id]);
    const result = queryResult[0];

    return result;
};

const getAdminMetrics = async () => {
    const query = "SELECT id, name, email, last_login, login_count FROM users";

    const queryResult = await db.query(query);
    const result = queryResult[0]

    return result;
}

module.exports = {
    getUserMetrics,
    getAdminMetrics
};