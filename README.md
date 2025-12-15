# Proyecto Inicial Angular Academy 2025

## Requisitos
- Node.js
- npm
- MySQL
- Angular

## Como correr el proyecto

### Clonar el repositorio
```
git clone https://github.com/roccodellamico-globant/AngularAcademy2025.git
```

### Frontend
```
cd frontend
npm install
npm start || ng serve -o
```
El frontend queda corriendo en:
```
http://localhost:4200
```

### Backend
```
cd backend
npm install
|_npm install --save-dev nodemon
|_npm install express
|_npm install bcrypt
|_npm install cors
|_npm i jsonwebtoken
|_npm install mysql2  
|_npm i dotenv
|_npm run dev
```
Crear un archivo .env en /backend
```
PORT=4000
JWT_SECRET=super_secret_key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=challenge
```
El backend queda corriendo en:
``` 
http://localhost:4000
```

### Base de Datos
Comandos para crearla
```
CREATE DATABASE angularacademy2025;
USE angularacademy2025;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(200),
    last_login DATETIME,
    login_count INT DEFAULT 0
);
DESCRIBE users;
```

## Features implementadas
- **Registro** de usuario
- **Inicio de sesión** con correo electrónico y contraseña
- **Cifrado** de contraseñas con *bcrypt*
- **Autenticación** con *JWT*
- **Rutas** de backend *protegidas*
- **Persistencia** de la *sesión* de usuario
- **API REST** desarrollada con *Express*
- **Frontend** desarrollado con *Angular*
- **Integración** con base de datos *MySQL*


## Arquitectura
- **Frontend**: Angular
- **Backend**: Node + Express
- **Base de datos**: MySQL