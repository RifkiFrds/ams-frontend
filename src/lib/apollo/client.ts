import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';

/**
 * Apollo Client Configuration
 *
 * Setup:
 * 1. Configure your GraphQL endpoint in GRAPHQL_ENDPOINT
 * 2. Add authentication middleware if needed
 * 3. Setup error handling policies
 */

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql';

// Authentication link (example - add your auth token logic)
const authLink = new ApolloLink((operation, forward) => {
  // Get auth token from storage or Zustand store
  // Example: const token = localStorage.getItem('authToken');
  
  // operation.setContext({
  //   headers: {
  //     authorization: `Bearer ${token}`,
  //   },
  // });

  return forward(operation);
});

// HTTP link
const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
  credentials: 'include', // Send cookies with requests
});

// Combine links
const link = authLink.concat(httpLink);

// Initialize Apollo Client
export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
});

export default apolloClient;
