import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { type Application } from 'express';
import { carTypeDefs } from '../graphql/typeDefs/car.typeDefs.ts';
import { carResolvers } from '../graphql/resolvers/car.resolvers.ts';

export async function startApolloServer(app: Application) {
  // Types, schemas, queries and mutations
  const typeDefs = [carTypeDefs];
  // Implementation of queries or mutations
  const resolvers = [carResolvers];

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const apolloServer = new ApolloServer({
    schema,
  });

  await apolloServer.start();

  app.use('/graphql', expressMiddleware(apolloServer));
}
