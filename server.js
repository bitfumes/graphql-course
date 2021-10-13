const { buildSchema, graphql } = require("graphql");

const schema = buildSchema(`
    type Query{
        name: String,
        email:String
    }
`);

const root = {
  name: () => {
    return "Sarthak";
  },
  email: () => {
    return "sarthak@bitfumes.com";
  },
};

graphql(schema, "{email,name}", root).then((res) => {
  console.log(res);
});
