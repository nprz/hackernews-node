const { prisma } = require("./generated/prisma-client");
const { GraphQLServer } = require("graphql-yoga");

// Resolvers
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");

// actual implementation of the GraphQL scheme
const resolvers = {
  Query,
  Mutation,
  User,
  Link
};

// creates server
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: request => ({ ...request, prisma })
});
server.start(() => console.log("Server is running on http://localhost:4000"));
