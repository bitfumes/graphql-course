const CharacterData = require("./harrypotter.json");

const resolvers = {
  Query: {
    humans() {
      return CharacterData.filter((cha) => !cha.species);
    },
    nonHumans() {
      return CharacterData.filter((cha) => !!cha.species);
    },
  },
};

module.exports = resolvers;
