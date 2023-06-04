import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  localWallet,
  metamaskWallet,
  smartWallet,
  coinbaseWallet,
  walletConnect,
  safeWallet,
  magicLink,
  useChainId,
} from "@thirdweb-dev/react";
import NextNProgress from "nextjs-progressbar";
import { NETWORK } from "../const/contractAddresses";
import "../styles/globals.css";
import Footer from "../components/Footer/Footer"


function MyApp({ Component, pageProps }: AppProps) {
  const chainId = useChainId();
  return (
    <ThirdwebProvider activeChain={NETWORK}
      supportedWallets={[
        smartWallet({
          factoryAddress: process.env.NEXT_PUBLIC_TWFactoryAddress,
          thirdwebApiKey: process.env.NEXT_PUBLIC_TWApiKey,
          gasless: true,
          personalWallets: [
            metamaskWallet(), 
            localWallet({ persist: true }), 
            coinbaseWallet(), 
            walletConnect(),
            safeWallet(),
            magicLink({
              apiKey: process.env.NEXT_PUBLIC_MAGIC as string,
            })
          ],
        }),
      ]}
    >
      {/* Progress bar when navigating between pages */}
      <NextNProgress
        color="var(--color-tertiary)"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />

      {/* Create a navigation menu on each page to allow for search on mainpage */}
      
      {/* Render the actual component (page) */}
      <Component {...pageProps} />
      <Footer/>
    </ThirdwebProvider>
  );
}

export default MyApp;
