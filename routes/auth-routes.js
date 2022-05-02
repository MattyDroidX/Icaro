const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");

// ---------------------------------------------------------------------------------------------------------------------------------------------------
// con el codigo de abajo: Aqui tenemos las rutas de los post para las funciones que tenemos en el authController, ejm la de la linea 9

// ---------------------------------------------------------------------------------------------------------------------------------------------------
// con el endpoint de abajo: PUNTO A - TP
authRouter.post("/api/login", authController.login);

// ---------------------------------------------------------------------------------------------------------------------------------------------------
// con el endpoint de abajo:

authRouter.post("/api/signup", authController.signUp);

module.exports = authRouter;
