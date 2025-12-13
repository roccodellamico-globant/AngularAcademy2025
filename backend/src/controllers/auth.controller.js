// Importar dependencias y modulos
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Importar el modelo
const authService = require("../services/auth.service");


const register = async (req, res) => {
    try {
        // Recoger datos de la peticion
        const { name, email, password } = req.body;

        // Validar si estan todas las propiedades
        if( authService.missingPropertyRegister(name, email, password)) {
            return res.status(401).json({
                message: "Invalid credentials",
                error: "Missing properties"
            });
        }
        // Validar email
        if( !authService.validEmail(email) ) {
            return res.status(401).json({
                message: "Invalid credentials:",
                error: "Invalid email"
            });
        }
        // Validar contraseña minima
        if( !authService.minimumPsw(password) ) {
            return res.status(401).json({
                message: "Invalid credentials",
                error: "The password must contain 8 characters and 1 number"
            });
        }

        //Hacer consulta para buscar al usuario por mail (si esta, tiramos error)
        console.log(email)
        const existingUser = await authService.findUserByEmail(email);
        console.log(existingUser)

        if( existingUser ){
            return res.status(409).json({
                message: "Conflict",
                error: "Email already in use"
            })
        }

        // Encripto la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Hacer consulta para guardar en la base de datos
        const newUser = await authService.registerUser([name, email, hashedPassword]);

        return res.status(201).json({
            message: "User successfully created",
            user: {
                id: newUser.insertId, name, email
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            error: "Please try again later"
        });
    }
};

const login = async (req, res) => {
    try {
        // Recoger datos de la peticion
        const { email, password } = req.body;
        console.log(email, password)

        // Validar si estan todas las propiedades
        if( authService.missingPropertyLogin(email, password)) {
            return res.status(401).json({
                message: "Invalid credentials",
                error: "Missing properties"
            });
        }

        //hacer consulta para buscar al usuario por mail (si no esta, tiramos error)
        const user = await authService.findUserByEmail(email);

        if( !user ) {
            console.log("not user")
            return res.status(404).json({
                message: "User not found",
                error: "No user found with the provided email or password"
            });
        }

        // Comparo la contraseña de la base de datos con la ingresada
        const valid = await bcrypt.compare(password, user.password);

        if( !valid ) {
            return res.status(401).json({
                message: "Invalid credentials",
                error: "The password is incorrect"
            });
        }

        // Creo el token
        const token = jwt.sign( 
            { id: user.id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: "2h" }
        );

        // Hacer conuslta para actualizar metricas
        await authService.updateMetrics(user.id)

        return res.status(200).json({
            message: "Successful login",
            token,
            user: { id: user.id, email: user.email }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            error: "Please try again later"
        });
    }
    
};

const me = async (req, res) => {
    try {
        const { id } = req.user; // El middleware ya agregó el usuario al request

        const user = await authService.me(id);
        console.log(user);

        return res.status(200).json({
            message: "User successfully obtained",
            user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            error: "Please try again later"
        });
    }
};

module.exports = {
    register,
    login,
    me,
}
