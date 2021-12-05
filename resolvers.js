const CharacterData = require("./harrypotter.json");

const resolvers = {
  Query: {
    characters() {
      return CharacterData;
    },
  },
};

module.exports = resolvers;
