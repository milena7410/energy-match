const express = require("express")
const { ApolloServer } = require("apollo-server-express")
const mongoose = require("mongoose")
const typeDefs = require("./schema")
const resolvers = require("./resolvers")

const app = express()

mongoose.connect("mongodb://localhost:27017/energy-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const server = new ApolloServer({ typeDefs, resolvers })

async function startServer() {
  await server.start()
  server.applyMiddleware({ app })

  app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`))
}

startServer()

