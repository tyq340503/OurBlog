"use strict";
const { GraphQLServer } = require("graphql-yoga");
const typeDefs = require("./graphql").typeDef;
const resolvers = require("./graphql").resolver;

const server = new GraphQLServer({ typeDefs, resolvers });
const options = {
  port: 5555,
  endpoint: "/graphql",
  subscriptions: "/subs",
  playground: "/playground"
};

server.start(options, ({ port }) =>
  console.log(`GraphQL server is running on http://localhost:${port}`)
);