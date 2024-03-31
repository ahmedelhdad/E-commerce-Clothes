import React, { StrictMode, useEffect, useState } from "react";
import '../styles/globals.css'
import Store from '../utils/Store'
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
export const useClient = () => {
  const [isClient, setIsClinet] = useState(false)
  useEffect(() => {
    setIsClinet(true)
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, [])
  return isClient
}

function MyApp({ Component, pageProps }) {
  const isClient = useClient()
  const queryClient = new QueryClient()
  return (
    <StrictMode>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <Provider store={Store}>
        <PayPalScriptProvider options={{ "client-id": 'AaPmWS1vcO3Dy1UJqVX9COVDXRZ8-94aX8-0Cmxnzl1PXSgQvkqAP-aSPToa-SQqxGcdgAGqnDfCuvwN' }}>
            {
              isClient && (
                <>{<Component {...pageProps} />}</>
              )
            }
            </PayPalScriptProvider>
        </Provider>
      </QueryClientProvider>
    </StrictMode>
  );
}

export default MyApp;
