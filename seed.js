const mongoose = require("mongoose")
const Fornecedor = require("./models/fornecedor")

const fornecedores = [
  {
    nome: "EcoEnergia Brasil",
    logo: "/placeholder.svg",
    estado: "São Paulo",
    custoKwh: 0.65,
    limiteMinKwh: 5000,
    totalClientes: 500000,
    avaliacaoMedia: 4.5,
    latitude: -23.5505,
    longitude: -46.6333,
  },
  {
    nome: "Força Verde",
    logo: "/placeholder.svg",
    estado: "Rio de Janeiro",
    custoKwh: 0.68,
    limiteMinKwh: 10000,
    totalClientes: 750000,
    avaliacaoMedia: 4.2,
    latitude: -22.9068,
    longitude: -43.1729,
  },
  {
    nome: "Energia Sustentável",
    logo: "/placeholder.svg",
    estado: "Minas Gerais",
    custoKwh: 0.62,
    limiteMinKwh: 3000,
    totalClientes: 300000,
    avaliacaoMedia: 4.7,
    latitude: -19.9167,
    longitude: -43.9345,
  },
  {
    nome: "AmazonPower",
    logo: "/placeholder.svg",
    estado: "Amazonas",
    custoKwh: 0.7,
    limiteMinKwh: 2000,
    totalClientes: 200000,
    avaliacaoMedia: 4.0,
    latitude: -3.119,
    longitude: -60.0217,
  },
  {
    nome: "Sul Energia",
    logo: "/placeholder.svg",
    estado: "Rio Grande do Sul",
    custoKwh: 0.63,
    limiteMinKwh: 4000,
    totalClientes: 400000,
    avaliacaoMedia: 4.6,
    latitude: -30.0346,
    longitude: -51.2177,
  },
]

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    await Fornecedor.deleteMany({})
    await Fornecedor.insertMany(fornecedores)

    console.log("Dados ok...")
    process.exit(0)
  } catch (error) {
    console.error("Oops:", error)
    process.exit(1)
  }
}

seedDatabase()

