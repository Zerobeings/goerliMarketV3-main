import styles from "./NFTCard.module.css";
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

export const NFTCard = ({ nft, i, collection }) => {
    var NFT_COLLECTION_ADDRESS = collection;
    const IDtoken = Number(nft.id.tokenId); 
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

       <div className={styles.nftContainer}>
            <Link
            href={`/token/${NFT_COLLECTION_ADDRESS}/${IDtoken}`}
            key={IDtoken}
            >
                <ThirdwebNftMedia metadata={nft.metadata} className={styles.nftImage} controls={true}/>
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
            </Link>
            <div>
                <Link href={`https://goerli.looksrare.org/collections/${NFT_COLLECTION_ADDRESS}/${IDtoken}/`} >
                    <Image
                  src="/icon-darkbg@512.png"
                  width={20}
                  height={20}
                  alt="rarible"
                  target="_blank"
                  style={linkStyle}
                    />
                
                </Link>
                <Link href={`https://testnets.opensea.io/assets/goerli/${NFT_COLLECTION_ADDRESS}/${IDtoken}/`}>
                    <Image
                  src="/opensea.png"
                  width={20}
                  height={20}
                  alt="rarible"
                  target="_blank"
                  style={linkStyle}
                    />
                
                </Link>
                <Link href={`https://testnet.rarible.com/token/${NFT_COLLECTION_ADDRESS}:${IDtoken}`}>
                    <Image
                  src="/rarible.png"
                  width={20}
                  height={20}
                  alt="rarible"
                  target="_blank"
                  style={linkStyle}
                    />
                </Link>
            </div>
          {nft.metadata.file && <a className={styles.fileLinks}>
            {(nft.metadata.file != null) && 
                <Link href={nft.metadata.file} target="_blank" className={styles.noDecoration} rel="noopener noreferrer">
                    <Image className={styles.imgFileLicense} src="/filelocation.png" height={30} width={30} alt=""/>
                </Link>
                }
                {(nft.metadata.file != null) && 
                <Link href={nft.metadata.license_url} target="_blank" className={styles.noDecoration} rel="noopener noreferrer">
                    <Image className={styles.imgFileLicense} src="/NFTlicense.png" height={30} width={30} alt=""/>
                </Link>
                }
            </a>}
       </div>
     
    )
}
