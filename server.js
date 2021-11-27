const { buildSchema, graphql } = require("graphql");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const app = express();

const schema = buildSchema(`
    type Query{
        name: String,
        email:String,
        age: Float,
        isDeveloper : Boolean
    }
`);

const root = {
  isDeveloper: () => 1,
  age: () => 2.4,
  name: () => {
    return "Sarthak";
  },
  email: () => {
    return "sarthak@bitfumes.com";
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(8000);

console.log("Server is running at http://localhost:8000");

// graphql(schema, "{email,name}", root).then((res) => {
//   console.log(res);
// });
