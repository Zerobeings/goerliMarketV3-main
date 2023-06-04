import { useContract } from "@thirdweb-dev/react";
import { DirectListingV3, EnglishAuction } from "@thirdweb-dev/sdk";
import Link from "next/link";
import React, { useState, useEffect, Dispatch } from "react";
import styles from "../../styles/Buy.module.css";
import NFT from "../NFT/NFT";
import { ListingsCard } from '../ListingsCard/ListingsCard';
import Skeleton from "../Skeleton/Skeleton";
import {ALCH_NET} from '../../const/contractAddresses';

type Props = {
  listing: DirectListingV3 | EnglishAuction;
};

/**
 * Accepts a listing and renders the associated NFT for it
 */
export default function ListingWrapper({ listing }: Props) {
  const NFT_COLLECTION_ADDRESS = listing.assetContractAddress;
  const [loaded, isLoaded] = useState(false);
  const [nft, setNft] = useState<any>([]);
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    (async () => {
    let nft;
    const baseURL = `https://${ALCH_NET}.g.alchemy.com/nft/v2/${API_KEY}`;
    const fetchURL = `${baseURL}/getNFTMetadata?contractAddress=${NFT_COLLECTION_ADDRESS}&tokenId=${listing.asset.id}&refreshCache=false`;
  
      try {
        await fetch(fetchURL, {
          method: "GET",
        }).then((data) => data.json()).then(nft => setNft(nft));
        isLoaded(true);
      } catch(e) {}
       
    })();
  },[NFT_COLLECTION_ADDRESS, API_KEY, listing.asset.id]);


  if (!loaded) {
    return (
      <div className={styles.nftContainer}>
        <Skeleton width={"100%"} height={"100%"} />
      </div>
    );
  }

  if (!loaded) return null;

  const tokenID = nft?.id?.tokenId ?? "undefined";

  return (
  
      <Link
        href={`/token/${NFT_COLLECTION_ADDRESS}/${tokenID}`}
        key={tokenID}
        className={styles.nftContainer}
      >
        <NFT nft={nft} collection={nft?.contract?.address}/>
      </Link>

  
  );
}
