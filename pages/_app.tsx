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
import Footer from "../components/Footer/Footer";
import Head from 'next/head';


function MyApp({ Component, pageProps }: AppProps) {
  const chainId = useChainId();
  return (
    <ThirdwebProvider activeChain={NETWORK}
      supportedWallets={[
        smartWallet({
          factoryAddress: process.env.NEXT_PUBLIC_TWFactoryAddress as string,
          thirdwebApiKey: process.env.NEXT_PUBLIC_TWApiKey as string,
          gasless: false,
        }),
        metamaskWallet(), 
        localWallet({ persist: true }), 
        coinbaseWallet(), 
        walletConnect(),
        safeWallet(),
        magicLink({
          apiKey: process.env.NEXT_PUBLIC_MAGIC as string,
        })
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
      <Head>
        <meta charSet="UTF-8"/>
        <title>Market gm</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:site" content="@Zero_beings"/>
        <meta name="twitter:title" content="Market gm"/>
        <meta name="twitter:description" content="Market gm"/>
        <meta name="twitter:image" content="https://www.zerobeings.xyz/images/OpenseaCard.png"/>
        <meta property="og:url" content="https://gm.zerobeings.xyz"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="Market gm"/>
        <meta property="og:description" content="Market gm"/>
        <meta property="og:image" content="https://www.zerobeings.xyz/images/OpenseaCard.png"/>
        <link rel="manifest" href="/manifest.webmanifest"/>
      </Head>

      {/* Create a navigation menu on each page to allow for search on mainpage */}
      
      {/* Render the actual component (page) */}
      <Component {...pageProps} />
      <Footer/>
    </ThirdwebProvider>
  );
}

export default MyApp;
