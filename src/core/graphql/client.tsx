import { ApolloClient, InMemoryCache } from '@apollo/client';

const graphqlServerUrl = 'https://nyori-crypto-tracker.herokuapp.com/graphql';

export const client = new ApolloClient({
  uri: graphqlServerUrl,
  cache: new InMemoryCache(),
});
