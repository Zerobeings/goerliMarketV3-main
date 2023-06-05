import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import React, { useState, useEffect } from "react";
import Container from "../Container/Container";
import NFTGridSell from "../NFT/NFTGridSell";
import tokenPageStyles from "../../styles/Token.module.css";
import SaleInfo from "../SaleInfo/SaleInfo";
import {ALCH_NET} from '../../const/contractAddresses';

export const Sell = () => {
  // Load all of the NFTs from the NFT Collection
  const address = useAddress();
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const [data, setData] = useState<any[]>([]);
  const [selectedNft, setSelectedNft] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    let nfts;
    const baseURL = `https://${ALCH_NET}.g.alchemy.com/v2/${API_KEY}/getNFTs/`;
    const pageCount = 100;
    var pageKeys = [];
    var pageKey = '';
    var wallet = address;
    
    const fetchURL = `${baseURL}?owner=${wallet}&pageKey=${pageKey}&pageSize=${pageCount}`;

    fetch(fetchURL, {
      method: "GET",
    }).then((data) => data.json()).then(nfts => setData(nfts.ownedNfts));
          
    setIsLoading(false)
  },[address, API_KEY]);


  return (
    <>
      {!selectedNft ? (
        <>
        <div>
          <NFTGridSell
            data={data}
            isLoading={isLoading}
            overrideOnclickBehavior={(nft) => {
              setSelectedNft(nft);
            }}
            emptyText={
              "Login to see your portfolio and sell an NFT. If you don't have any, head over to the homepage and buy one!"
            }
          />
          </div>
        </>
      ) : (
        <div className={tokenPageStyles.container} style={{ marginTop: 0 }}>
          <div className={tokenPageStyles.metadataContainer}>
            <div className={tokenPageStyles.imageContainer}>
              <ThirdwebNftMedia
                metadata={selectedNft.metadata}
                className={tokenPageStyles.image}
              />
              <button
                onClick={() => {
                  setSelectedNft(undefined);
                }}
                className={tokenPageStyles.crossButton}
              >
                X
              </button>
            </div>
          </div>

          <div className={tokenPageStyles.listingContainer}>
            <p>You&rsquo;re about to list the following item for sale.</p>
            <h1 className={tokenPageStyles.title}>
              {selectedNft.metadata.name}
            </h1>
            <p className={tokenPageStyles.collectionName}>
              Token ID #{Number(selectedNft.id.tokenId)}
            </p>
            <div className={tokenPageStyles.pricingContainer}>
              <SaleInfo nft={selectedNft} collection={selectedNft.contract.address} />
            </div>
          </div>
        </div>
      )}
   </>
  );
}
