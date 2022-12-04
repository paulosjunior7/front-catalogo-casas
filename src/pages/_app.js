
import "../../styles/globals.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Suspense } from "react";
import Loading from "src/feed/loading";

const client = new ApolloClient({
  ssrMode: true,
  uri: process.env.,
  cache: new InMemoryCache(),
});

REACT-APP-GRAPHQL-URL=https://sa-east-1.cdn.hygraph.com/content/clb8qwtkx1jxo01uk5j411lhg/master


function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Suspense fallback={<Loading />}>
        <Component {...pageProps} />
      </Suspense>
    </ApolloProvider>)
}

export default MyApp
