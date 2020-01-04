const { GraphQLServer } = require("graphql-yoga");

const links = [
  {
    id: "link-0",
    url: "https://www.howtographql.com/graphql-js/2-a-simple-query/",
    description: "link description"
  }
];

let idCount = links.length;
// actual implementation of the GraphQL scheme
const resolvers = {
  Query: {
    info: () => "this is the API of the hackernews clone",
    feed: () => links,
    link: (parent, args) => {
      return links.find(link => link.id === args.id);
    }
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      const linkIndex = links.findIndex(link => link.id === args.id);
      if (linkIndex === -1) {
        return;
      }

      links[linkIndex].url = args.url ? args.url : link[linkIndex].url;
      links[linkIndex].description = args.description
        ? args.description
        : links[linkIndex].description;

      return links[linkIndex];
    },
    deleteLink: (parent, args) => {
      const linkIndex = links.findIndex(link => link.id === args.id);
      if (linkIndex === -1) {
        return;
      }

      const elemToDelete = links[linkIndex];
      links.splice(linkIndex, 1);
      return elemToDelete;
    }
  }
};

// creates server
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});
server.start(() => console.log("Server is running on http://localhost:4000"));
