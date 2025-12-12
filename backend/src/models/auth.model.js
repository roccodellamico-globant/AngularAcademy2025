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

module.exports = {
  validEmail,
  minimumPsw,
  missingPropertyRegister,
  missingPropertyLogin,
};