import { ApolloClient, InMemoryCache } from '@apollo/client';

const graphqlServerUrl = 'https://nyori-crypto-tracker.onrender.com/graphql';

export const client = new ApolloClient({
  uri: graphqlServerUrl,
  cache: new InMemoryCache(),
});
