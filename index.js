import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import UserApi from "./userApi.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 },
  context: async () => {
    return {
      dataSources: {
        UserApi: new UserApi(),
      },
    };
  },
});

console.log(`Server ready at ${url}`);