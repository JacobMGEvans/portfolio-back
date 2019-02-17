import { ApolloServer } from "apollo-server";

import dotenv from "dotenv";
import resolvers from "./api/resolvers/resolver-merger";


dotenv.config();



const userGQLServer = new ApolloServer({
  typeDefs, 
  resolvers, 
  context: async () => userModels,
  tracing: true,
  cacheControl: true,
  engine: false,
});

const serverConnections = async () => {
  const userGQLStart = await userGQLServer.listen(
    {
      port: 4321,
      graphqlPaths: [`/api/printbrains`],
    },
    () => {
      console.log(`GQL Server is running on ${4321}`);
    }
  );

  const mongooseConnection = await mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true },
    () => console.log(`mongoose connected!`)
  );

  return [mongooseConnection, userGQLStart];
};
serverConnections().catch(error => {
  console.log(`#**#*##*#ERROR*#*#*#*# IN SERVER CATCH`, error);
});
