const { buildSchema, graphql } = require("graphql");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const app = express();

const schema = buildSchema(`
    type Person {
      name: String
      email:String,
    }

    type Developer {
      profile: Person,
      experience: Int,
    }

    type Query{
        sarthak: Developer,
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
  sarthak: () => {
    return {
      profile: { name: "Sarthak", email: "sarthak@bitfumes.com" },
      experience: 6,
    };
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
