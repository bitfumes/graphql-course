const CharacterData = require("./harrypotter.json");

const resolvers = {
  Character: {
    __resolveType(character, context, info) {
      if (character.species) {
        return "NonHuman";
      }

      if (!character.species) {
        return "Human";
      }

      return null;
    },
  },
  Query: {
    humans() {
      return CharacterData.filter((cha) => !cha.species);
    },
    nonHumans() {
      return CharacterData.filter((cha) => !!cha.species);
    },
    characters() {
      return CharacterData;
    },
  },
};

module.exports = resolvers;
