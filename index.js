const { ApolloServer, gql } = require("apollo-server");
const types = require("./types");
const resolvers = require("./resolvers");
const context = require("./context");

const server = new ApolloServer({ typeDefs: types, resolvers, context });

server.listen().then(({ url }) => {
  console.log("Server is running at " + url);
});
