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
      return Character.findAll({
        where: {
          species: {
            [Op.ne]: null,
          },
        },
      });
    },
    characters(_, __, { Character }) {
      return Character.findAll();
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
