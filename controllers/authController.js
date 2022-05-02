const User = require("../model/user-model");
const http = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { DatabaseError } = require("sequelize/dist");

// ---------------------------------------------------------------------------------------------------------------------------------------------------
// con el codigo de abajo creo la funcion que permite registrar al usuario.  Aqui en la linea hace referencia al Hasheo creado en la linea 59 de user-model
// para guardar la contraseña en base de datos

const signUp = async (req, res) => {
  const data = ({ firstname, lastname, username, password, city, country } =
    req.body);
  console.log(
    "🚀 ~ file: authController.js ~ line 7 ~ signUp ~ data",
    req.body
  );

  // con el codigo de abajo: Verificamos que no se ingresn usuarios repetidos
  try {
    const exists_user = await User.findAndCountAll({
      where: {
        username: data.username,
      },
      attributes: ["firstname", "username"],
    });
    // con el codigo de abajo: si todo va bien y el usuario no esta repetido, vamos a crear un token que son creados en la funsion de la linea 52
    if (!exists_user.count) {
      const user = await User.create(data);
      if (user) {
        const token = _createToken(user.id_user, user.username);
        res.set("Authorization", "Bearer " + token);
        return res.json({ status: http.StatusCodes.OK, data: user });
      }
    }

    return res.json({
      status: http.StatusCodes.BAD_REQUEST,
      data: "Existing username, enter another",
    });
  } catch (error) {
    console.log("error: ", error);
    return res.json({
      status: http.StatusCodes.INTERNAL_SERVER_ERROR,
      data: {},
    });
  }
};

// ---------------------------------------------------------------------------------------------------------------------------------------------------
// con el codigo de abajo: Funcion que crea el token, recibe el id y el suername. Esta la icluimos en las variables de entorno en el .env

const _createToken = (id, username) => {
  return jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });
};

// ---------------------------------------------------------------------------------------------------------------------------------------------------
// con el codigo de abajo: Creamos la funcion que permita el logeo del usuario. y usamos la funcion de la linea 72 de user-model para comparar, lo que
// nos ingresan con lo que tenemos en la BBDD

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: {
      username,
    },
  });
  console.log(user);
  if (user) {
    const result = await user.comparePassword(password, user);

    if (result) {
      const token = _createToken(user.id_user, user.username);
      console.log("token: ", token);
      res.set("Authorization", "Bearer " + token);
      return res.json({
        status: http.StatusCodes.OK,
        Authorization: "Authenticated " + token,
      });
    }
  }
  return res.json({
    status: http.StatusCodes.UNAUTHORIZED,
    data: "Unautheticated",
    msg: "Bad credentials",
  });
};

module.exports = {
  login,
  signUp,
};
