const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/integradorConnection");
// ---------------------------------------------------------------------------------------------------------------------------------------------------
// con el codigo de abajo: Es para relacionar las tablas de la base de datos con el codigo de la linea 53
const Message = require("./message-model");

// ---------------------------------------------------------------------------------------------------------------------------------------------------
// con el codigo de abajo: Llamo a la libreria que me permite hashear la contraseña del usuario (se baja con npm i bcrypt)
const bcrypt = require("bcrypt");

// ---------------------------------------------------------------------------------------------------------------------------------------------------
// con el codigo de abajo es como quiero que se arme la estructura de la tabla,los campos que quiero que tenga la tabla.
class User extends Model {}

User.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize,
  }
);

// ---------------------------------------------------------------------------------------------------------------------------------------------------
// con el codigo de abajo: creo el codigo para hashear la contraseña, uilizamos el metodo beforeCreate para que antes de la creacion haga algo, en este
// Caso, el hasheo.

User.beforeCreate(async (user, options) => {
  const salt = await bcrypt.genSalt();
  return bcrypt
    .hash(user.password, salt)
    .then((hash) => {
      user.password = hash;
    })
    .catch((err) => console.log(err));
});

// ---------------------------------------------------------------------------------------------------------------------------------------------------
// con el codigo de abajo: Creamos la funcion para que la desencripte por medio del bcrypt la contraseña y la compare con lo que tenemos en BBDD

User.prototype.comparePassword = async (passaword, user) => {
  return await bcrypt.compare(passaword, user.password);
};

// ---------------------------------------------------------------------------------------------------------------------------------------------------
// con el codigo de abajo: Para que el ORM empiece a entender que esas dos cosas se relacionan, lo tengo que tener en alguno de los dos modelos.
User.hasMany(Message, { as: "sender", foreignKey: "id_user" });
Message.belongsTo(User, { as: "sender", foreignKey: "id_user" });

User.hasMany(Message, { as: "receiver", foreignKey: "id_user" });
Message.belongsTo(User, { as: "receiver", foreignKey: "id_receiver" });

// ---------------------------------------------------------------------------------------------------------------------------------------------------
module.exports = User;
