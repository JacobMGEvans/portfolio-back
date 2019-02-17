import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';

dotenv.config();

const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: '', // FIREBASE
  tracing: true,
  cacheControl: true,
  engine: false
});

const connection = await graphqlServer.listen(
  {
    port: 4321,
    graphqlPaths: [`/portfolio`]
  },
  () => {
    console.log(`GQL Server is running on ${4321}`);
  }
);
return connection;
