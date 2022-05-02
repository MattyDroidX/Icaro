require("dotenv").config();
// ---------------------------------------------------------------------------------------------------------------------------------------------------
// con el codigo de abajo conecto el codigo a la base de datos
const sequelize = require("../database/integradorConnection");

// ---------------------------------------------------------------------------------------------------------------------------------------------------
// con el codigo de abajo llamo a los formatos de las tablas creadas en users y message
const User = require("./user-model");
const Message = require("./message-model");

// ---------------------------------------------------------------------------------------------------------------------------------------------------
// con el codigo de abajo: Aqui definimos como queremos las relaciones entre tablas (user y message) con el metodo hasMany y belongsTo
User.hasMany(Message, { as: "sender", foreignKey: "id_user" });
Message.belongsTo(User, { as: "sender", foreignKey: "id_user" });

User.hasMany(Message, { as: "receiver", foreignKey: "id_user" });
Message.belongsTo(User, { as: "receiver", foreignKey: "id_receiver" });

// ---------------------------------------------------------------------------------------------------------------------------------------------------
// con el codigo de abajo: Le agrego la propiedad alter:true que lo que hace ante cualquier cambio en la estructura en user-model-seq o
// message-model-seq lo actualiza. Pero no lo borra, para que lo borre tengo que usar force:true

sequelize.sync({ alter: true });

// ---------------------------------------------------------------------------------------------------------------------------------------------------
// NOTA IMPORTANTE !!!!!
// para ejecutar esto abro un gitbush dentro del proyecto y ejecuto el .js de associations
// con el siguiente codigo $ node model/associations.js
