const characters = require("./db/harrypotter.json");
const wands = require("./db/wands.json");

const context = {
  characters,
  wands,
};

module.exports = context;
