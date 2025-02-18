const Fornecedor = require("./models/fornecedor")

const resolvers = {
  Query: {
    fornecedores: () => Fornecedor.find(),
    fornecedor: (_, { id }) => Fornecedor.findById(id),
    buscarFornecedores: (_, { consumoMensal }) => {
      return Fornecedor.find({ limiteMinKwh: { $lte: consumoMensal } })
    },
  },
  Mutation: {
    criarFornecedor: (_, args) => {
      const fornecedor = new Fornecedor(args)
      return fornecedor.save()
    },
  },
}

module.exports = resolvers

