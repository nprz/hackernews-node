const { prisma } = require("./generated/prisma-client");
const { GraphQLServer } = require("graphql-yoga");

// Resolvers
const { feed } = require("./resolvers/Query");
const { signup, login, post } = require("./resolvers/Mutations");

// actual implementation of the GraphQL scheme
const resolvers = {
  Query: {
    feed
  },
  Mutation: {
    post
  }
};

// creates server
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: request => ({ ...request, prisma })
});
server.start(() => console.log("Server is running on http://localhost:4000"));
