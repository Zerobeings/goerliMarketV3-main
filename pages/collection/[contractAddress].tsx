import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import stylesnav from "../../components/Searchbar/Searchbar.module.css";
import slideStyles from "../../components/Slideshow/Slideshow.module.css";
import { NFTCard } from '../../components/NFTCard/NFTCard';
import React, { useState, useRef, useEffect } from "react"
import { ConnectWallet, useAddress, useContract, useNFTs } from "@thirdweb-dev/react";
import Container from "../../components/Container/Container";
import { Slideshow } from '../../components/Slideshow/Slideshow';
import FontAwesomeIcon from '@fortawesome/free-solid-svg-icons';
import { CollectionInfo } from '../../components/CollectionInfo/CollectionInfo';
import { ListingsCard } from '../../components/ListingsCard/ListingsCard';
import {ALCH_NET} from '../../const/contractAddresses';
import { useRouter } from "next/router";
import {Searchbar} from '../../components/Searchbar/Searchbar';

/**
 * Landing page with a simple gradient background and a hero asset.
 * Free to customize as you see fit.  
 */
export default function CollectionPage()  {
    const router = useRouter();
    const address = useAddress();
    const collection = router.query.contractAddress as string
    const [NFTs, setNFTs] = useState<any[]>([]);
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    (async () => {
    let nfts;
    console.log("fetching NFTs");
    const baseURL = `https://${ALCH_NET}.g.alchemy.com/v2/${API_KEY}/getNFTsForCollection`
    const pageCount = 100;
    const withMetadata = true;
    var pageKey = '';
    var pageKeys = []; 
    const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${withMetadata}&startToken=${pageKey}&limit=${pageCount}`;

    fetch(fetchURL, {
      method: "GET",
    }).then((data) => data.json()).then(nfts => setNFTs(nfts.nfts));
    
  })();
},[collection, API_KEY]);

const fetchNFTs = async() => {
  
    let nfts;
    console.log("fetching NFTs");
    const baseURL = `https://eth-sepolia.g.alchemy.com/v2/${API_KEY}/getNFTsForCollection`
    const pageCount = 100;
    const withMetadata = true;
    var pageKey = '';
    var pageKeysM = []; 
    const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${withMetadata}&startToken=${pageKey}&limit=${pageCount}`;
    //const fetchfp = `https://eth-mainnet.g.alchemy.com/nft/v2/${API_KEY}/getFloorPrice?contractAddress=${collection}`; //for mainnet

    const fp = null;
    try {
            const nfts = await fetch(fetchURL, {method: "GET",}).then((data) => data.json());
            setNFTs(nfts.nfts);
            
            //const fp = await fetch(fetchfp, { method: 'GET' }).then((data) => data.json()); //for mainnet
            // const fp = null;

            // IDToken = NFTs[0].id.tokenId;
            // const royaltyURL = `https://api.rarible.org/v0.1/items/ETHEREUM:${collection}:${IDToken}/royalties`;
            // const royalties = await fetch(royaltyURL, {method: 'GET'}).then((data) => data.json());
            
          } catch (error) {
            console.log("Error");
            
          }
    }


  return (
    <div className={styles.container}>
       <Searchbar />
      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.heroBackground}>
            <div className={styles.heroBackgroundInner}>
              <Image
                src="/hero-gradient.png"
                width={1390}
                height={1390}
                alt="Background gradient from red to blue"
                quality={100}
                className={styles.gradient}
              />
            </div>
          </div>
          <div className={styles.heroAssetFrame}>
            
          </div>
         
          <div className={styles.heroBodyContainer}>
            <div className={styles.heroBody}>
              <h1 className={styles.heroTitle}>
                <span className={styles.heroTitleGradient}>
                  sepolia - Market gm ☕️
                </span>
              </h1>
              <div className={styles.textCenter}>0.5% Platform Fee & <a className={styles.link} href="https://eips.ethereum.org/EIPS/eip-2981">EIP-2981</a> Royalties Honored</div>
              <div className={styles.nftDetails}>Search, Collect, Sell & Experience Digital Art</div>   
            </div>
          </div>
          <h1 className={styles.collectionViewTitle}>Editor&apos;s Choice</h1>
        </div>
        <div> 
          <Slideshow/>
        </div>
      </div>
      <div className={styles.marketContainer}>
        <div className={styles.gridMarket}>
          <div className={styles.market1}>
            <h4 className={styles.collectionViewTitle}>Collection Info</h4>
            {!!NFTs && <CollectionInfo Nfts={NFTs}/>}
          </div>
          <div className={styles.market2}>
            <div>
              <h4 className={styles.collectionViewTitle}>Available Listings</h4>
            </div>
              <div className={styles.nftGridContainer}>
                {!!NFTs.length &&
                  NFTs.map((nft, i) => {
                    return <ListingsCard nft={nft} key={i} collection={collection}></ListingsCard>;
                  })}
              </div>
          </div>  
          <div className={styles.market3}>
            <div>
              <h4 className={styles.collectionViewTitle}>View Collection</h4>
            </div>
            <div className={styles.nftGridContainer}>
              {!!NFTs.length &&
                NFTs.map((nft, i) => {
                  return <NFTCard nft={nft} key={i} collection={collection}></NFTCard>;
                })}
            </div>
          </div>
        </div>                 
        </div>
    </div>
  );
};
