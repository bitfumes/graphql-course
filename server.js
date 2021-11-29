const { buildSchema, graphql } = require("graphql");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const usersData = require("./users.json");

const app = express();

const schema = buildSchema(`
    type Person {
      name: String,
      email: String
    }

    type Query{
      users: [Person],
      user(id: Int): Person
    }
`);

const root = {
  users: () => usersData,
  user: ({ id }) => usersData.find((user) => user.id === id),
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
