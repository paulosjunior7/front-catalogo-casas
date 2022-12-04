
import "../../styles/globals.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Suspense } from "react";
import Loading from "src/feed/loading";

const client = new ApolloClient({
  ssrMode: true,
  uri: process.env.API_URL,
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Suspense fallback={<Loading />}>
        <Component {...pageProps} />
      </Suspense>
    </ApolloProvider>)
}

export default MyApp
