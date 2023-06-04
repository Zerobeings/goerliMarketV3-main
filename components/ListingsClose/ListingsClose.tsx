import styles from "./ListingsClose.module.css";
import Link from "next/link";
import Image from "next/image";
import { ThirdwebNftMedia,
    useContract,
    useValidDirectListings,
    useValidEnglishAuctions,
    Web3Button,
} from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS } from "../../const/contractAddresses";
import Skeleton from "../Skeleton/Skeleton";
import React, { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import toastStyle from "../../util/toastConfig";

type Props = {
    nft: any;
    index: any;
  };

export default function ListingsClose({ nft, index}: Props){
    var NFT_COLLECTION_ADDRESS = nft.asset.assetContractAddress;


     // Connect to marketplace contract
    const { contract: marketplace } = useContract(
        MARKETPLACE_ADDRESS,
        "marketplace-v3"
    );

    async function closeSeller() {
        let txResult;
        if (nft.id) {
            txResult = await marketplace?.englishAuctions.closeAuctionForSeller(
            nft.id
          );
        } else {
            throw new Error("Listing was not Closed");
        }
        return txResult;
      }
    
    return (

        <>
            <div className={styles.nftContainer}>       
                <ThirdwebNftMedia metadata={nft.asset} className={styles.nftImage} controls={true}/>
                <p className={styles.nftTokenId}>Token ID #{nft.asset.id}</p>
                <p className={styles.nftName}>{nft.asset.name}</p>
                <div className={styles.priceContainer}>
               
                    <Web3Button
                    className = {styles.closeListing}
                    contractAddress={MARKETPLACE_ADDRESS}
                    action={async () => await closeSeller()}
                    onSuccess={() => {
                    toast(`Listing Closed`, {
                        icon: "✅",
                        style: toastStyle,
                        position: "bottom-center",
                    });
                    }}
                    onError={(e) => {
                    console.log(e);
                    toast(`Closure failed! Reason: ${e.message}`, {
                        icon: "❌",
                        style: toastStyle,
                        position: "bottom-center",
                    });
                    }}
                >
                    Close Auction
                </Web3Button>
                </div>
            </div>
        </>
    )
}
