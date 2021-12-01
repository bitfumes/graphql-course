const { buildSchema, graphql } = require("graphql");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const usersData = require("./users.json");

const app = express();

let fakeDb = [
  { id: 1, name: "office", rent: "$25" },
  { id: 2, name: "co-working", rent: "$10" },
];

const schema = buildSchema(`
    type Person {
      name: String,
      email: String
    }

    type Space {
      name: String
      rent: String
    }

    type Query{
      users: [Person],
      user(id: Int): Person
      getMsg : String
      getSpace(id:ID!) : Space !
    }

    type Mutation {
      addMsg(msg: String): String
      createSpace(name:String,rent:String) : Space!
    }
`);

const root = {
  users: () => usersData,
  user: ({ id }) => usersData.find((user) => user.id === id),
  addMsg: ({ msg }) => (fakeDb.message = msg),
  getMsg: () => fakeDb.message,
  createSpace: ({ name, rent }) =>
    (fakeDb[fakeDb.length] = { id: fakeDb.length, name, rent }),

  getSpace: ({ id }) => {
    return fakeDb.find((space) => space.id == id);
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
