const { ApolloServer, gql } = require("apollo-server");
const CharacterData = require("./harrypotter.json");

const types = gql`
  type Wand {
    wood: String!
    core: String!
    length: Float
  }

  enum GENDER {
    male
    female
  }

  type Characters {
    id: ID
    name: String
    gender: GENDER
    dateOfBirth: String
    actor: String
    image: String
    wand: Wand
  }

  type Query {
    characters: [Characters!]!
  }
`;

const resolvers = {
  Query: {
    characters() {
      return CharacterData;
    },
  },
};

const server = new ApolloServer({ typeDefs: types, resolvers });

server.listen().then(({ url }) => {
  console.log("Server is running at " + url);
});
