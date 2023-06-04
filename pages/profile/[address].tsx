import {
  useContract,
  useOwnedNFTs,
  useAddress,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Container from "../../components/Container/Container";
import ListingWrapper from "../../components/ListingWrapper/ListingWrapper";
import Skeleton from "../../components/Skeleton/Skeleton";
import {
  MARKETPLACE_ADDRESS,
  ALCH_NET,
} from "../../const/contractAddresses";
import styles from "../../styles/Profile.module.css";
import randomColor from "../../util/randomColor";
import { Navbar } from "../../components/Navbar/Navbar";
import { NFTCard } from '../../components/NFTCard/NFTCard';
import { ListingsCard } from '../../components/ListingsCard/ListingsCard';
import {Sell} from '../../pages/sell';
import {Close} from '../../pages/close';

const [randomColor1, randomColor2, randomColor3, randomColor4] = [
  randomColor(),
  randomColor(),
  randomColor(),
  randomColor(),
];

export default function ProfilePage() {
  const router = useRouter();
  const address = useAddress();
  const [tab, setTab] = useState<"nfts" | "listings" | "auctions" | "sell" | "close">("nfts");
  const [NFTs, setNFTs] = useState([]);
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    (async () => {
      let nfts;
      const baseURL = `https://${ALCH_NET}.g.alchemy.com/v2/${API_KEY}/getNFTs/`;
      const pageCount = 100;
      var pageKeys = [];
      var pageKey = '';
      var wallet = `${router.query.address}` as string;
      
      const fetchURL = `${baseURL}?owner=${wallet}&pageKey=${pageKey}&pageSize=${pageCount}`;

      await fetch(fetchURL, {
        method: "GET",
      }).then((data) => data.json()).then(nfts => setNFTs(nfts.ownedNfts));
            
    })();
  },[router.query.address, API_KEY]);

  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { data: directListings, isLoading: loadingDirects } =
  useValidDirectListings(marketplace, {
    seller: router.query.address as string,
  });

  const { data: auctionListings, isLoading: loadingAuctions } =
    useValidEnglishAuctions(marketplace, {
      seller: router.query.address as string,
    });

  return (
    <Container maxWidth="lg">
      <Navbar/>
      <div className={styles.profileHeader}>
        <div
          className={styles.coverImage}
          style={{
            background: `linear-gradient(90deg, ${randomColor1}, ${randomColor2})`,
          }}
        />
        <div
          className={styles.profilePicture}
          style={{
            background: `linear-gradient(90deg, ${randomColor3}, ${randomColor4})`,
          }}
        />
        <h1 className={styles.profileName}>
          {router.query.address ? (
            router.query.address.toString().substring(0, 4) +
            "..." +
            router.query.address.toString().substring(38, 42)
          ) : (
            <Skeleton width="320" />
          )}
        </h1>
      </div>

      <div className={styles.tabs}>
        <h3
          className={`${styles.tab} 
        ${tab === "nfts" ? styles.activeTab : ""}`}
          onClick={() => setTab("nfts")}
        >
          Portfolio
        </h3>
        <h3
          className={`${styles.tab} 
        ${tab === "listings" ? styles.activeTab : ""}`}
          onClick={() => setTab("listings")}
        >
          Listings
        </h3>
        <h3
          className={`${styles.tab}
        ${tab === "auctions" ? styles.activeTab : ""}`}
          onClick={() => setTab("auctions")}
        >
          Auctions
        </h3>
        {address && <h3
          className={`${styles.tab}
        ${tab === "sell" ? styles.activeTab : ""}`}
          onClick={() => setTab("sell")}
        >
          Sell
        </h3>}

        {address && <h3
          className={`${styles.tab}
        ${tab === "close" ? styles.activeTab : ""}`}
          onClick={() => setTab("close")}
        >
          Close
        </h3>}

      </div>

      <div
        className={`${
          tab === "nfts" ? styles.activeTabContent : styles.tabContent
        }`}
      >
        <div className={styles.nftGridContainer}>
         {!!NFTs.length &&
                NFTs.map((nft, i) => {
                  return <NFTCard nft={nft} key={i+nft.contract.address+nft.tokenUri.raw} collection={nft.contract.address}></NFTCard>;
                })}
        </div>
      </div>

      <div
        className={`${
          tab === "listings" ? styles.activeTabContent : styles.tabContent
        }`}
      >
        <div className={styles.nftGridContainer}>
          {loadingDirects ? (
            <p>Loading...</p>
          ) : directListings && directListings.length === 0 ? (
            <p>Nothing for sale yet! Head to the sell tab to list an NFT.</p>
          ) : (
            !!NFTs.length &&
              NFTs.map((nft, i) => {
                return <ListingsCard nft={nft} key={i+nft.contract.address} collection={nft.contract.address}></ListingsCard>;
              })
          )}
        </div>
      </div>

      <div
        className={`${
          tab === "auctions" ? styles.activeTabContent : styles.tabContent
        }`}
      >
        {loadingAuctions ? (
          <p>Loading...</p>
        ) : auctionListings && auctionListings.length === 0 ? (
          <p>Nothing for sale yet! Head to the sell tab to list an NFT.</p>
        ) : (
          auctionListings?.map((listing) => (
            <ListingWrapper listing={listing} key={listing.id} />
          ))
        )}
      </div>
      <div
        className={`${
          tab === "sell" ? styles.activeTabContent : styles.tabContent
        }`}
      >
        {address &&
        <div className={styles.nftGridContainer}>
         <Sell /> 
        </div>
        }
      </div>

      <div
        className={`${
          tab === "close" ? styles.activeTabContent : styles.tabContent
        }`}
      >
       {address &&
          <div className={styles.nftGridContainer}>
            <Close />   
          </div>
      }
      </div>

    </Container>
  );
}
