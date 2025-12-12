const db = require("../config/db");

const validEmail = (email) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

const minimumPsw = (password) => {
  return /^(?=.*\d).{8,}$/.test(password);
};

const missingPropertyRegister = (name, email, password) => {
  if (!name || !email || !password) {
    return true;
  }
  return false;
}

const missingPropertyLogin = (email, password) => {
  if (!email || !password) {
    return true;
  }
  return false;
}

const findUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = ?";

  const queryResult = await db.query(query, [email]);
  const rows = queryResult[0];

  return rows.length > 0 ? rows[0] : null;
};

const registerUser = async ([name, email, hashedPassword]) => {
  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  const queryResult  = await db.query(query, [name, email, hashedPassword]);
  const result = queryResult[0]

  return result;
}

const updateMetrics = async (id) => {
  console.log("Adentro")
  const query = "UPDATE users SET last_login = NOW(), login_count = login_count + 1 WHERE id = ?";

  await db.query(query, [id]);
  console.log("listo")
};

const me = async (id) => {
  const query = "SELECT id, name, email, last_login, login_count FROM users WHERE id = ?"

  const queryResult = await db.query(query, [id]);
  const result = queryResult[0];

  return result;
};

module.exports = {
  validEmail,
  minimumPsw,
  missingPropertyRegister,
  missingPropertyLogin,
  findUserByEmail,
  registerUser,
  updateMetrics,
  me,
};
