import {
  ThirdwebNftMedia,
  useContract,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";
import React from "react";
import {
  MARKETPLACE_ADDRESS,
} from "../../const/contractAddresses";
import { DirectListingV3, EnglishAuction } from "@thirdweb-dev/sdk";
import Skeleton from "../Skeleton/Skeleton";
import styles from "./NFT.module.css";

type Props = {
  nft: any;
  collection: any;
  listing: DirectListingV3 | EnglishAuction;
  key: string;
};

export default function NFTComponent({ nft, collection, listing, key }: Props) {
  const NFT_COLLECTION_ADDRESS = collection;
  const IDtoken = Number(nft?.id?.tokenId) || nft?.metadata?.id; 
  const { contract: marketplace, isLoading: loadingContract } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  // 1. Load if the NFT is for direct listing
  const { data: directListing, isLoading: loadingDirect } =
    useValidDirectListings(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: IDtoken,
    });

  // 2. Load if the NFT is for auction
  const { data: auctionListing, isLoading: loadingAuction } =
    useValidEnglishAuctions(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: IDtoken,
    });

  return (
    <>
      <ThirdwebNftMedia metadata={nft.metadata} className={styles.nftImage} />

      <p className={styles.nftTokenId}>Token ID #{IDtoken}</p>
      <p className={styles.nftName}>{nft.metadata.name}</p>

      <div className={styles.priceContainer}>
        {loadingContract || loadingDirect || loadingAuction ? (
          <Skeleton width="100%" height="100%" />
        ) : directListing && directListing[0] ? (
          <div className={styles.nftPriceContainer}>
            <div>
              <p className={styles.nftPriceLabel}>Price</p>
              <p className={styles.nftPriceValue}>
                {`${directListing[0]?.currencyValuePerToken.displayValue}
          ${directListing[0]?.currencyValuePerToken.symbol}`}
              </p>
            </div>
          </div>
        ) : auctionListing && auctionListing[0] ? (
          <div className={styles.nftPriceContainer}>
            <div>
              <p className={styles.nftPriceLabel}>Minimum Bid</p>
              <p className={styles.nftPriceValue}>
                {`${auctionListing[0]?.minimumBidCurrencyValue.displayValue}
          ${auctionListing[0]?.minimumBidCurrencyValue.symbol}`}
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.nftPriceContainer}>
            <div>
              <p className={styles.nftPriceLabel}>Price</p>
              <p className={styles.nftPriceValue}>Not for sale</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
