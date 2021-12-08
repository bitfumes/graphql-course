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
    wand(parent, __, { wands }) {
      return wands.find((item) => item.character_id === parent.id);
    },
  },
  Wand: {
    length(parent) {
      return parent.length ?? 0;
    },
  },
  Query: {
    humans(_, __, { characters }) {
      return characters.filter((cha) => !cha.species);
    },
    human(_, { id }, { characters }) {
      return characters.find((cha) => cha.id === id);
    },
    nonHumans(_, __, { characters }) {
      return characters.filter((cha) => !!cha.species);
    },
    characters(_, __, { characters }) {
      return characters;
    },
  },
  Mutation: {
    createCharacter(_, { data }, { characters }) {
      data = { ...data, id: characters.length + 1 };
      characters.push(data);
      return data;
    },
  },
};

module.exports = resolvers;
