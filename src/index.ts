import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 5000;

  app.use(express.json());

  const server = new ApolloServer({
    typeDefs: `
    type Query {
      hello: String!
    }
    `,
    resolvers: {
      Query: { hello: () => "Hello World" },
    },
  });

  await server.start();

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
  });

  app.use("/graphql", expressMiddleware(server));

  app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
}

init();
