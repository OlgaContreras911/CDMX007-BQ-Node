// 1. Importaciones/Requerimientos
const mongoose = require("mongoose");

// 2. Schema/Esquema
const burgersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: 1
  },
  price: {
    type: Number
  },
  quantity: {
    type: Number
  },
  total: {
    type: Number
  }
});
// 3. Conversión a Modelo/ Model Conversion

const Burgers = mongoose.model("Burgers", burgersSchema, "Burgers");

// 4. Exprotación

module.exports = { Burgers };
