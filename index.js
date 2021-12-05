const { ApolloServer, gql } = require("apollo-server");

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const types = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books() {
      return books;
    },
  },
};

const server = new ApolloServer({ typeDefs: types, resolvers });

server.listen().then(({ url }) => {
  console.log("Server is running at " + url);
});
