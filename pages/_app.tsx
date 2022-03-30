import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import client from "../apollo-client";
import store from "../redux/store";
import { useEffect, useState } from "react";

declare const window: any;

function MyApp({ Component, pageProps }: AppProps) {
  const [initialized, initialize] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const OneSignal = (window.OneSignal = window.OneSignal || []);
      OneSignal.push(function () {
        OneSignal.init({
          appId: "d52fc1e2-08bb-459c-a534-743e692f6662",
          notifyButton: {
            enable: true,
          },
          allowLocalhostAsSecureOrigin: true,
        });
      });

      initialize(true);
    }

    return () => {
      window.OneSignal = undefined;
    };
  }, []);

  const handleOneSignalUserId = async () => {
    const OneSignal = (window.OneSignal = window.OneSignal || []);
    const id = await OneSignal?.getUserId();

    if (id) {
      window.localStorage.setItem("osId", id);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (initialized) {
        handleOneSignalUserId();
      }
    }
  }, [initialized]);

  console.log("is one signal initialized?", initialized);
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
