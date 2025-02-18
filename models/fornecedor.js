const mongoose = require("mongoose")

const fornecedorSchema = new mongoose.Schema({
  nome: String,
  logo: String,
  estado: String,
  custoKwh: Number,
  limiteMinKwh: Number,
  totalClientes: Number,
  avaliacaoMedia: Number,
  latitude: Number,
  longitude: Number,
})

module.exports = mongoose.model("Fornecedor", fornecedorSchema)

