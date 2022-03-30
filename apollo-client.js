import { ApolloClient, createHttpLink, InMemoryCache, } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';



const link = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "same-origin",

});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token =  window.localStorage.getItem('@auth_token');

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

export default client;
