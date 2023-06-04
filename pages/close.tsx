import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
  Web3Button,
} from "@thirdweb-dev/react";
import React, { useState, useEffect } from "react";
import Container from "../components/Container/Container";
import ListingsClose from "../components/ListingsClose/ListingsClose";
import ListingsCloseBid from "../components/ListingsClose/ListingsCloseBid";
import tokenPageStyles from "../styles/Token.module.css";
import {ALCH_NET, MARKETPLACE_ADDRESS} from '../const/contractAddresses';
import toast, { Toaster } from "react-hot-toast";
import toastStyle from "../util/toastConfig";

export const Close = () => {
  // Load all of the NFTs from the NFT Collection
  const address = useAddress();
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const [seller, setSeller] = useState<any[]>([])
  const [bid, setBid] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>();

   // Connect to marketplace smart contract
   const { contract: marketplace, isLoading: loadingContract } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  useEffect(() => {
    (async () => {
      setIsLoading(false);
      
      const myAuctionsToClose_o = []; //all my auctions to close bidder/offeror
      const myAuctionsToClose_s = []; //all my auctions to close seller
      const myWins = [];

      try {
        const allListings_offeror = await marketplace?.englishAuctions.getAll({offeror: address}); 
        const validListings_offeror = await marketplace?.englishAuctions.getAllValid({offeror: address}); 
        const allListings_seller = await marketplace?.englishAuctions.getAll({seller: address}); 
        const validListings_seller = await marketplace?.englishAuctions.getAllValid({seller: address}); 
      
        if(allListings_offeror?.length > 0) { 
          allListings_offeror.forEach(el1 => {      
            var el1IsPresentInArr2 = validListings_offeror?.some(el2 => el2.id === el1.id); 
              if (!el1IsPresentInArr2) { 
                myAuctionsToClose_o.push(el1);    
              }
          }
        )};
    
        if(allListings_seller?.length > 0) { 
          allListings_seller.forEach(el1 => {      
            var el1IsPresentInArr2 = validListings_seller?.some(el2 => el2.id === el1.id); 
              if (!el1IsPresentInArr2) { 
                myAuctionsToClose_s.push(el1);    
              }
          }
        )};

        if(myAuctionsToClose_o.length > 0) { 
          for (let i = 0; i < myAuctionsToClose_o.length; i++) {
            let timeLeft = Math.round(parseInt(myAuctionsToClose_o[i].endTimeInEpochSeconds - (Math.floor(Date.now()/1000)))/86400)
            const winner = await marketplace?.englishAuctions.getWinner(myAuctionsToClose_o[i].id); //get the listing connected to the specific offer  
            if(winner.toLowerCase() === address.toLowerCase() && timeLeft <= 0 && timeLeft >= -7){
              myWins.push(myAuctionsToClose_o[i]);
            } 
          }
        }
      } catch (e){}

      setSeller(myAuctionsToClose_s);
      setBid(myWins);
      setIsLoading(true);
        
    })();
  },[address, marketplace]);
  console.log(seller)


  return (
    <>
    {bid != "" &&
    <>
      <div>
        
          {isLoading && 
          <>
          <h3>My Winning Bids</h3>
            {!!bid.length &&
              bid.map((nft, i) => {
                return <ListingsCloseBid nft={nft} key={nft.asset.id+nft.contractAddress}></ListingsCloseBid>;
              })}
            </>
          }
      </div>
    </>
      }
      {seller != "" &&
    <> 
        <div>
            {isLoading && 
            <>
             <h3>My Auctions</h3>
              {!!seller.length &&
                seller.map((nft, i) => {
                  return <ListingsClose nft={nft} key={i+nft.asset.id+nft.contractAddress}></ListingsClose>;
                })}
              </>
            }
        </div>
    </>
      }
  </>
  );
}
