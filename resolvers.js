const { Op } = require("sequelize");

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
    humans(_, __, { Character }) {
      return Character.findAll();
    },
    human(_, { id }, { Character }) {
      return Character.findAll({
        where: {
          id: id,
        },
      });
    },
    nonHumans(_, __, { Character }) {
      return Character.findAll({});
    },
    characters(_, __, { Character }) {
      return Character.findAll();
    },
  },
  Mutation: {
    async createCharacter(_, { data }, { Character }) {
      id = (await Character.count()) + 1;
      data = { ...data, id };
      return await Character.create(data);
    },
  },
};

module.exports = resolvers;
