// Importar modulos
const jwt = require("jsonwebtoken");

const authMiddleWare = (req, res, next) => {
    const token = req.headers.authorization

    if( !token ){
        return res.status(401).json({
            message: "La peticion no tiene la cabezera de autenticacion"
        })
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Agregar datos de usuario a la requets { id, email }
        req.user = decoded;

    } catch( error ) {
        return res.status(401).json({
            message: "Token invalido"
        });
    }

    // Pasara a ejecucion de accion
    next()
};

module.exports = { authMiddleWare };
