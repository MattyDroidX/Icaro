var { Sequelize } = require("sequelize");

// ---------------------------------------------------------------------------------------------------------------------------------------------------
// con el codigo de abajo zeteo los parametros via .env para conectarme a la base de datos
var integrador = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_CONNECTION,
  }
);

// ---------------------------------------------------------------------------------------------------------------------------------------------------
// con el codigo de abajo corroboro la autenticacion y manejar el console.log de confirmacion de
// "estar conectado a la base de datos"

integrador
  .authenticate()
  .then(() => {
    console.log("Connected to database with sequelize");
  })
  .catch((err) => {
    console.log("err: ", err);
  });

module.exports = integrador;
