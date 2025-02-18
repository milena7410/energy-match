import { gql } from "@apollo/client"

export const GET_FORNECEDORES = gql`
  query GetFornecedores($page: Int!, $pageSize: Int!) {
    fornecedores(page: $page, pageSize: $pageSize) {
      fornecedores {
        id
        nome
        logo
        estado
        custoKwh
        limiteMinKwh
        totalClientes
        avaliacaoMedia
        latitude
        longitude
      }
      totalCount
      totalPages
    }
  }
`

export const BUSCAR_FORNECEDORES = gql`
  query BuscarFornecedores($consumoMensal: Int!) {
    buscarFornecedores(consumoMensal: $consumoMensal) {
      id
      nome
      logo
      estado
      custoKwh
      limiteMinKwh
      totalClientes
      avaliacaoMedia
      latitude
      longitude
    }
  }
`

export const CRIAR_FORNECEDOR = gql`
  mutation CriarFornecedor(
    $nome: String!
    $logo: String!
    $estado: String!
    $custoKwh: Float!
    $limiteMinKwh: Int!
    $totalClientes: Int!
    $avaliacaoMedia: Float!
    $latitude: Float!
    $longitude: Float!
  ) {
    criarFornecedor(
      nome: $nome
      logo: $logo
      estado: $estado
      custoKwh: $custoKwh
      limiteMinKwh: $limiteMinKwh
      totalClientes: $totalClientes
      avaliacaoMedia: $avaliacaoMedia
      latitude: $latitude
      longitude: $longitude
    ) {
      id
      nome
      logo
      estado
      custoKwh
      limiteMinKwh
      totalClientes
      avaliacaoMedia
      latitude
      longitude
    }
  }
`

