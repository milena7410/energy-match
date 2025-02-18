const { gql } = require("apollo-server-express")

const typeDefs = gql`
  type Fornecedor {
    id: ID!
    nome: String!
    logo: String!
    estado: String!
    custoKwh: Float!
    limiteMinKwh: Int!
    totalClientes: Int!
    avaliacaoMedia: Float!
    latitude: Float!
    longitude: Float!
  }

  type Query {
    fornecedores: [Fornecedor!]!
    fornecedor(id: ID!): Fornecedor
    buscarFornecedores(consumoMensal: Int!): [Fornecedor!]!
  }

  type Mutation {
    criarFornecedor(
      nome: String!
      logo: String!
      estado: String!
      custoKwh: Float!
      limiteMinKwh: Int!
      totalClientes: Int!
      avaliacaoMedia: Float!
      latitude: Float!
      longitude: Float!
    ): Fornecedor!
  }
`

module.exports = typeDefs

