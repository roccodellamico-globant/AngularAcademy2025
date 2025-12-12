// Importar dependencias y modulos
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Importar el modelo
const authModel = require("../models/auth.model");


const register = async (req, res) => {
    // Recoger datos de la peticion
    const { name, email, password} = req.body;

    // Validar si estan todas las propiedades
    if( authModel.missingPropertyRegister(name, email, password)) {
        res.status(401).json({
            message: "Invalid credentials",
            error: "Missing properties"
        });
    }
    // Validar email
    if( !authModel.validEmail(email) ) {
        res.status(401).json({
            message: "Invalid credentials:",
            error: "Invalid email"
        });
    }
    // Validar contraseña minima
    if( !authModel.minimumPsw(password) ) {
        res.status(401).json({
            message: "Invalid credentials",
            error: "The password must contain 8 characters and 1 number"
        });
    }

    //TODO Hacer consulta para buscar al usuario por mail (si esta, tiramos error)

    // Hacer consulta para guardar en la base de datos
    res.status(201).json({
        message: "User successfully created",
        user: {
            name, email, password
        }
    });
};

const login = async (req, res) => {
    // Recoger datos de la peticion
    const { email, password } = req.body;

    // Validar si estan todas las propiedades
    if( authModel.missingPropertyLogin(email, password)) {
        res.status(401).json({
            message: "Invalid credentials",
            error: "Missing properties"
        });
    }

    //TODO hacer consulta para buscar al usuario por mail (si no esta, tiramos error)

    // Comparo la contraseña de la base de datos con la ingresada
    const valid = await bcrypt.compare(password, user.password);

    if( !valid ) {
        res.status(401).json({
            message: "Invalid credentials",
            error: "The password must contain 8 characters and 1 number"
        });
    }

    //TODO hacer conuslta para actualizar metricas

    // Creo el token
    const token = jwt.sign( 
        { id: user.id, email: user.email }, 
        process.env.JWT_SECRET, 
        { expiresIn: "2h" }
    );
    res.status(200).json({
        message: "Successful login",
        token,
        user: { id: user.id, email: user.email }
    })
};

const me = async (req, res) => {
    const { id } = req.user;

    //TODO hacer consulta para pbtener los datos de ese usuario
    res.status(200).json({
        message: "User successfully obtained",
        user
    });
};

module.exports = {
    register,
    login,
    me,
}

