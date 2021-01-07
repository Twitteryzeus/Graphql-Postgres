const { ApolloServer } = require("apollo-server");
const models = require("./server/models");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models },
});

server
  .listen()
  .then(({ url }) => {
    console.log(`Server running on ${url}`);
  })
  .catch((error) => {
    console.log("Error", error);
  });
