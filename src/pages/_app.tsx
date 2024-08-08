import { OrdersProvider } from "@/contexts/Orders.context";
import { RidersProvider } from "@/contexts/Riders.context";

import type { AppProps } from "next/app";
import "@/styles/global.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <OrdersProvider>
      <RidersProvider>
        <Component {...pageProps} />
      </RidersProvider>
    </OrdersProvider>
  );
}