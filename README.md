
# ⚠️🚧 This Repo is Under Construction 🚧⚠️ #

# NFT Marketplace V3

Create an NFT marketplace on top of your NFT collection on **any** EVM-compatible blockchain.

## Features

- View all NFTs from your collection and their status on the marketplace on the [buy](/pages/buy.tsx) page.

- Select which NFT from your wallet to sell for either a **direct listing** or **english auction** on the marketplace on the [sell](/pages/sell.tsx) page.

- View all NFTs a user owns from your collection on the [profile](/pages/profile/%5Baddress%5D.tsx) pages.

- Buy NFTs directly from the marketplace on the [item](/pages/token/%5BcontractAddress%5D/%5BtokenId%5D.tsx) pages.

- Place bids/offers on NFTs from the marketplace on the [item](/pages/token/%5BcontractAddress%5D/%5BtokenId%5D.tsx) pages.

<br/>

## Using this template

1. Deploy a [Marketplace V3](https://thirdweb.com/thirdweb.eth/MarketplaceV3) contract
2. Fork this repo
3. Run `yarn`
4. Plug your contract addresses, chain, highlight collection, and slideshow collections in the [contractAddresses.ts](/const/contractAddresses.ts) file.

<br/>

### Deploy the Marketplace V3 contract

Head to the [MarketplaceV3](https://thirdweb.com/thirdweb.eth/MarketplaceV3) contract page on the thirdweb dashboard.

Deploy the marketplace to the same network as your NFT collection.

<br/>

### Fork this repository

_Note: This requires [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [Git](https://git-scm.com/downloads). [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) is also recommended._

<br/>

### Add your contract addresses

In the [contractAddresses.ts](/const/contractAddresses.ts) file, add your contract addresses and chain.

If you haven't already, import your smart contracts into the [thirdweb dashboard](https://thirdweb.com/dashboard).

```ts
/** Replace the values below with the addresses of your smart contracts. */

// 1. Set up the network your smart contracts are deployed to.
// First, import the chain from the package, then set the NETWORK variable to the chain.
import { Goerli } from "@thirdweb-dev/chains";
export const NETWORK = Goerli;

// 2. The address of the marketplace V3 smart contract.
// Deploy your own: https://thirdweb.com/thirdweb.eth/MarketplaceV3
export const MARKETPLACE_ADDRESS = "0x73322E853E2633C3F831924A717a46D67965312e";

// // 3. The address of your Highlighted NFT collection smart contract.
export const NFT_COLLECTION_HIGHLIGHT =
  "0x9870Da00643AeA2BE9dF89d87efeD0A2fdb5479e";

// 4. Set up the URL of where users can view transactions on
// For example, below, we use goerli.etherscan to view transactions on the goerli testnet.
export const ETHERSCAN_URL = "https://goerli.etherscan.io/";

// 5. Alchemy Network URL for NFT Endpoint
export const ALCH_NET = "eth-goerli"

// 6. Your Branding
export const FOOTER_LOGO = "/zerobeings_logo_m_goerli.png"
export const NAV_LOGO = "/zerobeings_logo_goerli.png"
export const PROFILE_LOGO = "/user-icon.png"

// 7. Editos' choice slide show. Set the URL and the image.
// If an image link is provided, you will need to update the next.config.js with the domain. An example is provided in the next.config.js file.
export const SLIDE_1 = "0x9870Da00643AeA2BE9dF89d87efeD0A2fdb5479e"
export const SLIDE_1_IMG = "https://nft-cdn.alchemy.com/eth-goerli/ea2e10829257be64d922f4b2b3be3712"

export const SLIDE_2 = "0x97f2318bfadec027d24a28759123889dc11e41db"
export const SLIDE_2_IMG = "/slideshow/joffee.png"

export const SLIDE_3 = "0xdb6F6f88b32793349CA121421777a7615c4B8848"
export const SLIDE_3_IMG = "https://nft-cdn.alchemy.com/eth-goerli/d52b21a446888459f210a0ab965e3f8b"

export const SLIDE_4 = "0x557803A3f398EF2563683eA83D3d1fD110d6cCEC"
export const SLIDE_4_IMG = "https://nft-cdn.alchemy.com/eth-goerli/ba632837db52828238c108de917ac2bb"

export const SLIDE_5 = "0x9870Da00643AeA2BE9dF89d87efeD0A2fdb5479e"
export const SLIDE_5_IMG = "https://nft-cdn.alchemy.com/eth-goerli/ea2e10829257be64d922f4b2b3be3712"

export const SLIDE_6 = "0x97f2318bfadec027d24a28759123889dc11e41db"
export const SLIDE_6_IMG = "/slideshow/joffee.png"

export const SLIDE_7 = "0xdb6F6f88b32793349CA121421777a7615c4B8848"
export const SLIDE_7_IMG = "https://nft-cdn.alchemy.com/eth-goerli/d52b21a446888459f210a0ab965e3f8b"

export const SLIDE_8 = "0x09e8617f391c54530CC2D3762ceb1dA9F840c5a3"
export const SLIDE_8_IMG = "https://nft-cdn.alchemy.com/eth-goerli/3733eb0db73c4f5fd3ab3048e0368820"

export const SLIDE_9 = "0x9870Da00643AeA2BE9dF89d87efeD0A2fdb5479e"
export const SLIDE_9_IMG = "https://nft-cdn.alchemy.com/eth-goerli/ea2e10829257be64d922f4b2b3be3712"
```