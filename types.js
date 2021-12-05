const { gql } = require("apollo-server");

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

  interface Character {
    id: ID!
    name: String
    gender: GENDER
  }

  type NonHuman implements Character {
    id: ID!
    name: String
    gender: GENDER
    species: String
  }

  type Human implements Character {
    id: ID!
    name: String
    gender: GENDER
    dateOfBirth: String
    actor: String
    image: String
    wand: Wand
  }

  type Query {
    humans: [Human!]!
    nonHumans: [NonHuman!]!
    characters: [Character!]!
  }
`;

module.exports = types;
