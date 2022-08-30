const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const express = require('express');
const { createServer } = require('http');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');

const app = express();
const httpServer = createServer(app);

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const pubsub = require('./pubsub');

const schema = makeExecutableSchema({ typeDefs, resolvers });

const db = require('./db');
db();

// Models
const Event = require('./models/Event');
const Location = require('./models/Location');
const Participant = require('./models/Participant');
const User = require('./models/User');

const server = new ApolloServer({
  schema,
  context: {
    pubsub,
    db: {
      Event,
      Location,
      Participant,
      User,
    },
  },
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginLandingPageGraphQLPlayground({}),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          },
        };
      },
    },
  ],
});

const subscriptionServer = SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe,
    async onConnect() {
      console.log('Connected!');
      return {
        pubsub,
        db: {
          Event,
          Location,
          Participant,
          User,
        },
      };
    },
    onDisconnect() {
      console.log('Disconnected!');
    },
  },
  {
    server: httpServer,
    path: server.graphqlPath,
  }
);

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();
