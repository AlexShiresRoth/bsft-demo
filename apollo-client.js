import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const link = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "same-origin",

});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
