const CharacterData = require("./db/harrypotter.json");
const wands = require("./db/wands.json");

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
  Human: {
    wand(parent) {
      return wands.find((item) => item.character_id === parent.id);
    },
  },
  Wand: {
    length(parent) {
      return parent.length ?? 0;
    },
  },
  Query: {
    humans(parent) {
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
