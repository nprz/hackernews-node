const { GraphQLServer } = require("graphql-yoga");

const links = [
  {
    id: "link-0",
    url: "https://www.howtographql.com/graphql-js/2-a-simple-query/",
    description: "link description"
  }
];

// actual implementation of the GraphQL scheme
const resolvers = {
  Query: {
    info: () => "this is the API of the hackernews clone",
    feed: () => links
  },
  Link: {
    id: parent => parent.id,
    description: parent => parent.description,
    url: parent => parent.url
  }
};

// creates server
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});
server.start(() => console.log("Server is running on http://localhost:4000"));
