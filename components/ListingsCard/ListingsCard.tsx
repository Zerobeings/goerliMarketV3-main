import styles from "./ListingsCard.module.css";
import Link from "next/link";
import Image from "next/image";
import { ThirdwebNftMedia,
    useContract,
    useValidDirectListings,
    useValidEnglishAuctions,
} from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS } from "../../const/contractAddresses";
import Skeleton from "../Skeleton/Skeleton";
import React, { useState, useRef, useEffect } from "react";

export const ListingsCard = ({ nft, i, collection }) => {
    var NFT_COLLECTION_ADDRESS = collection;
    const IDtoken = Number(nft.id?.tokenId) || nft.metadata.id; 
    const linkStyle = {
        margin: '20px',
      };
    
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
            {directListing && directListing[0] ? (
                <div className={styles.nftContainer}>
                    <Link
                    href={`/token/${NFT_COLLECTION_ADDRESS}/${IDtoken}`}
                    key={IDtoken}
                    >
                        <ThirdwebNftMedia metadata={nft.metadata} className={styles.nftImage} controls={true}/>
                        <p className={styles.nftTokenId}>Token ID #{IDtoken}</p>
                        <p className={styles.nftName}>{nft.metadata.name}</p>
                        <div className={styles.priceContainer}>
                        <Skeleton width="100%" height="100%" />
                            <div className={styles.nftPriceContainer}>
                                <div>
                                    <p className={styles.nftPriceLabel}>Price</p>
                                    <p className={styles.nftPriceValue}>
                                    {`${directListing[0]?.currencyValuePerToken.displayValue}
                                    ${directListing[0]?.currencyValuePerToken.symbol}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ) : auctionListing && auctionListing[0] && (
                <div className={styles.nftContainer}>
                    <Link
                    href={`/token/${NFT_COLLECTION_ADDRESS}/${IDtoken}`}
                    key={IDtoken}
                    >
                        <ThirdwebNftMedia metadata={nft.metadata} className={styles.nftImage} controls={true}/>
                        <p className={styles.nftTokenId}>Token ID #{IDtoken}</p>
                        <p className={styles.nftName}>{nft.metadata.name}</p>
                        <div className={styles.priceContainer}>
                            <Skeleton width="100%" height="100%" />
                            <div className={styles.nftPriceContainer}>
                                <div>
                                    <p className={styles.nftPriceLabel}>Minimum Bid</p>
                                    <p className={styles.nftPriceValue}>
                                        {`${auctionListing[0]?.minimumBidCurrencyValue.displayValue}
                                        ${auctionListing[0]?.minimumBidCurrencyValue.symbol}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            )}
        </>
    )
}
