const { buildSchema, graphql } = require("graphql");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const usersData = require("./users.json");

const app = express();

let fakeDb = [
  { id: 1, name: "office", rent: "$25", status: "available" },
  { id: 2, name: "co-working", rent: "$10", status: "not_available" },
];

const schema = buildSchema(`
    type Person {
      id: Int!
      name: String
      email: String
      pet: String
      petName: String
    }

    type Space {
      name: String
      rent: String
      status: String
    }

    type Query{
      users: [Person],
      user(id: Int): Person
      getMsg : String
      getSpace(id:ID!) : Space !
      spaces(status: STATUS): [Space!]!
    }

    input SpaceInput {
      name:String
      rent:String
      status: STATUS
    }

    enum STATUS {
      available
      not_available
    }

    type Mutation {
      addMsg(msg: String): String
      createSpace(input: SpaceInput) : Space!
      updateSpace(id:ID!, input: SpaceInput) : Space!
    }
`);

const root = {
  users: () => usersData,
  user: ({ id }) => usersData.find((user) => user.id === id),
  addMsg: ({ msg }) => (fakeDb.message = msg),
  getMsg: () => fakeDb.message,
  createSpace: ({ input }) =>
    (fakeDb[fakeDb.length] = {
      id: fakeDb.length,
      ...input,
    }),

  getSpace: ({ id }) => {
    return fakeDb.find((space) => space.id == id);
  },
  updateSpace: ({ id, input }) => {
    const index = id - 1;
    fakeDb[index] = { id, ...input };
    return fakeDb[index];
  },
  spaces: ({ status }) => {
    if (status) {
      return fakeDb.filter((space) => space.status === status);
    }
    return fakeDb;
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
