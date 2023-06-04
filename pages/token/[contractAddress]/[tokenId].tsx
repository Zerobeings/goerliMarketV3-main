import {
  MediaRenderer,
  ThirdwebNftMedia,
  useContract,
  useAddress,
  useContractEvents,
  useValidDirectListings,
  useValidEnglishAuctions,
  Web3Button,
  useOffers,
  useWinningBid,
} from "@thirdweb-dev/react";
import React, { useState, useEffect, useRef } from "react";
import Container from "../../../components/Container/Container";
import {ThirdwebSDK } from "@thirdweb-dev/sdk";
import {
  ETHERSCAN_URL,
  MARKETPLACE_ADDRESS,
  NETWORK,
  ALCH_NET,
} from "../../../const/contractAddresses";
import styles from "../../../styles/Token.module.css";
import Link from "next/link";
import randomColor from "../../../util/randomColor";
import Skeleton from "../../../components/Skeleton/Skeleton";
import toast, { Toaster } from "react-hot-toast";
import toastStyle from "../../../util/toastConfig";
import mapStyle from "../../../util/mapConfig";
import {abi} from "../../../components/abi/erc721";
import { useRouter } from "next/router";
import { Navbar } from "../../../components/Navbar/Navbar";
import { GoogleMap, MarkerF, InfoWindow, useJsApiLoader, LoadScript } from '@react-google-maps/api';
import OpenLocationCode from "../../../util/open-location-code";
import DOMPurify from "dompurify";
import type { NFT as NFTType } from "@thirdweb-dev/sdk";


const [randomColor1, randomColor2] = [randomColor(), randomColor()];

interface NFT {
  metadata?: {
    attributes: Record<string, any>;
    centerpoint: string;
    contentstring: string | null;
  };
  contract?: {
    address: string;
  };
  media: {
    gateway: string;
  }[];
  description: string;
  contractMetadata:{
    name: string;
    image: string;
  };
  title: string;
  image: string;
}

interface OWNER {
    owners: string;
}

export default function TokenPage() {
  const router = useRouter();
  const address = useAddress();
  const [bidValue, setBidValue] = useState<string>();
  const [nft, setNft] = useState<NFT | null>(null)
  const [owner, setOwner] = useState<OWNER | null>(null);
  const [ownerLoaded, isOwnerLoaded] = useState(false);
  const [center, setCenter] = useState<any>({});
  const [location, setLocation] = useState<any>({});
  const [image, setImage] = useState<string>("");
  const [content, setContent] = useState<string | null>("");
  const [selectedMarker, setSelectedMarker] = useState<any | null>(location);
  const [offers, setOffers] = useState<any[] | undefined>([])
  const [bids, setBids] = useState<any>()
  const mapRef = useRef<google.maps.Map | null>(null);
  const [display, setDisplay] = useState<boolean>(false);
  const [url, setURL] = useState<boolean>(false);
  const [urlImage, setUrlImage] = useState<string>();

  // Connect to marketplace smart contract
  const { contract: marketplace, isLoading: loadingContract } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  // Connect to NFT Collection smart contract
  const NFT_COLLECTION_ADDRESS = router.query.contractAddress as string;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;
  const tokenID = router.query.tokenId as string;

  //Fetch all info related to the nft of interest on page load
  useEffect(() => {
    (async () => {
    let nft;
    const baseURL = `https://${ALCH_NET}.g.alchemy.com/nft/v2/${API_KEY}`;
    const fetchURL = `${baseURL}/getNFTMetadata?contractAddress=${NFT_COLLECTION_ADDRESS}&tokenId=${router.query.tokenId as string}&refreshCache=false`;
    const fetchOwner = `${baseURL}/getOwnersForToken?contractAddress=${NFT_COLLECTION_ADDRESS}&tokenId=${router.query.tokenId as string}`;
      try {
        await fetch(fetchOwner, {
          method: "GET",
        }).then((data) => data.json()).then(owner => setOwner(owner));
        isOwnerLoaded(true)
      } catch(e) {}  

      try {
        await fetch(fetchURL, {
          method: "GET",
        }).then((data) => data.json()).then(nft => setNft(nft));
      } catch(e) {}

      try{
        const Image = nft.media[0].gateway;
        setUrlImage(Image);
        setURL(true);
      }catch(e) {}
       
    })();
  },[NFT_COLLECTION_ADDRESS, API_KEY, router.query.tokenId, marketplace]);

  const { data: directListing, isLoading: loadingDirect } =
    useValidDirectListings(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: tokenID,
    });

  // 2. Load if the NFT is for auction
  const { data: auctionListing, isLoading: loadingAuction } =
    useValidEnglishAuctions(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: tokenID,
    });

   useEffect(() => {
    (async () => {
      let winningBid;
      let offerD;
      try{
        if (auctionListing?.[0]) {
          winningBid = await marketplace?.englishAuctions.getWinningBid(auctionListing[0].id); 
          setBids(winningBid);
        } 
      
        if (directListing?.[0]) {
          offerD = await marketplace?.offers.getAllValid({tokenId: tokenID});
          setOffers(offerD);
        }
      } catch(e) {}
    })();
  },[tokenID, marketplace?.englishAuctions, marketplace?.offers, auctionListing, directListing]);




    useEffect(() => {
        let nft;
        // The location of loctok NFT
        if(NFT_COLLECTION_ADDRESS === '0xb6c29b68fecedbf005743c3eaf5139328b651deb'){
          var centerl = { lat: 40.783, lng: -73.971 };
          setCenter(centerl);
          if (nft) {
            var attributes = Object.keys(nft['metadata']['attributes']);
              for (let p=0; p<attributes.length; p++){ 
                  if (nft['metadata']['attributes'][p]['trait_type'] === "Loc" && NFT_COLLECTION_ADDRESS === '0xb6c29b68fecedbf005743c3eaf5139328b651deb'){
                      var a = "87G8"+nft['metadata']['attributes'][p]['value'];
                      var area = OpenLocationCode.decode(a);
                      var loc = { lat: area.latitudeCenter, lng: area.longitudeCenter };
                      setLocation(loc);
                      setDisplay(true);
                  }
              }
          }
        } else if(nft && nft['metadata'] && nft['metadata']['attributes']) {

          var c = nft['metadata']['centerpoint'];
          var carea = OpenLocationCode.decode(c);
          var centerl = { lat: carea.latitudeCenter, lng: carea.longitudeCenter };
          setCenter(centerl);
          var attributes = Object.keys(nft['metadata']['attributes']);
            for (let p=0; p<attributes.length; p++){ 
            if (nft['metadata']['attributes'][p]['trait_type'] === "Loc"){
                var a:string = nft['metadata']['attributes'][p]['value'];
                var area = OpenLocationCode.decode(a);
                var loc = { lat: area.latitudeCenter, lng: area.longitudeCenter };
                setLocation(loc);
                setDisplay(true);
            }
          }
    
        }

        //content string for marker window
        if (NFT_COLLECTION_ADDRESS === '0xb6c29b68fecedbf005743c3eaf5139328b651deb'){
          var presanitizeString:string =
              '<div id="content" class="color-black">' +
              '<div id="siteNotice" class="color-black">' +
              "</div>" +
              '<h1 id="firstHeading" class="firstHeading">Warp Crystal</h1>' +
              '<div id="bodyContent" class="color-black">' +
              "<p><b>Congratulations</b> 🎉, you found this Warp Crystal in the minting maze!</p>" +
              "Location based NFT features will be coming soon to Market gm ☕️" +
              "</div>" +
              "</div>";
              var contentString = DOMPurify.sanitize(presanitizeString);
          } else if (nft && nft['metadata'] && nft['metadata']['contentstring']){
              const presanitizeString = new DOMParser().parseFromString(nft['metadata']['contentstring'], "text/html").all[0].textContent!;
              var contentString = DOMPurify.sanitize(presanitizeString);
              setContent(contentString);
             
          }
    },[nft, NFT_COLLECTION_ADDRESS]);

  async function createBidOrOffer() {
    let txResult;
    if (!bidValue) {
      toast(`Please enter a bid/offer value`, {
        icon: "❌",
        style: toastStyle,
        position: "bottom-center",
      });
      return;
    }

    if (auctionListing?.[0]) {
      txResult = await marketplace?.englishAuctions.makeBid(
        auctionListing[0].id,
        bidValue
      );
    } else if (directListing?.[0]) {
      txResult = await marketplace?.offers.makeOffer({
        assetContractAddress: NFT_COLLECTION_ADDRESS,
        tokenId: tokenID,
        totalPrice: bidValue,
        endTimestamp: new Date(Date.now() + 604800),
      });
    } else {
      throw new Error("No valid listing found for this NFT");
    }

    return txResult;
  }

  async function buyListing() {
    let txResult;

    if (auctionListing?.[0]) {
      txResult = await marketplace?.englishAuctions.buyoutAuction(
        auctionListing[0].id
      );
    } else if (directListing?.[0]) {
      txResult = await marketplace?.directListings.buyFromListing(
        directListing[0].id,
        1
      );
    } else {
      throw new Error("No valid listing found for this NFT");
    }
    return txResult;
  }

  async function cancelListing() {
    let txResult;
    if (auctionListing?.[0]) {
      txResult = await marketplace?.englishAuctions.cancelAuction(
        auctionListing[0].id
      );
    } else if (directListing?.[0]) {
      txResult = await marketplace?.directListings.cancelListing(
        directListing[0].id
      );
    } else {
      throw new Error("Listing was not Cancelled");
    }
    return txResult;
  }


  //Initialize the loctok
  const { isLoaded } = useJsApiLoader({
    id: 'loctok',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API as string
  });



  const onLoad = (map: google.maps.Map): void => {
    mapRef.current = map;
    
  };

  const onUnmount = (): void => {
    mapRef.current = null;
  }


  // if(nft){
  //   const Image = nft.media[0].gateway;
  //   setUrlImage(Image);
  //   setURL(true);
  //   }

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Container maxWidth="lg">
        <Navbar/>
        {display && 
            <GoogleMap
              mapContainerStyle={mapStyle}
              center={center}
              zoom={15}
              onLoad = {onLoad}
              onUnmount = {onUnmount}
              options={{ mapId: "9acd4f3c1c3df605" }}
            >
              {urlImage !== undefined &&
              <MarkerF
              icon={{
                url: urlImage,
                scaledSize: new window.google.maps.Size(50, 50), // scaled size
                origin: new window.google.maps.Point(0, 0), // origin
                anchor: new window.google.maps.Point(0, 32) // anchor
              }}
              position={location}
              onClick={() => {setSelectedMarker(location)}}
              >
                {selectedMarker && (<InfoWindow
                position={location}
                onCloseClick={() => {setSelectedMarker(null)}}>
                    <div className={styles.black}>
                    {content}
                    </div>
                </InfoWindow>)}
              </MarkerF>
              }
            </GoogleMap>
        }
        <div className={styles.container}>
          <div className={styles.metadataContainer}>
            {urlImage &&
            <MediaRenderer
              src={urlImage}
              className={styles.image}
              controls={true}
            />}
            {nft &&
            
            <div className={styles.descriptionContainer}>
              <h3 className={styles.descriptionTitle}>Description</h3>
              <p className={styles.description}>{nft.description}</p>
              <h3 className={styles.descriptionTitle}>Traits</h3>

              <div className={styles.traitsContainer}>
                {nft.metadata?.attributes?.map((trait:any, i:number) => (
                    <div className={styles.traitContainer} key={i}>
                      <p className={styles.traitName}>{trait.trait_type}</p>
                      <p className={styles.traitValue}>{trait.value?.toString() || ""} </p>
                    </div>
                  ))}
              </div>
          
           
            {offers !== undefined ? (
              <>
                <h3 className={styles.descriptionTitle}>Offers</h3>
                
                <div className={styles.traitsContainer}>
                  {offers?.map((offer, index) => (
                    <div
                      key={index}
                      className={styles.eventsContainer}
                    >
                      <div className={styles.eventContainer}>
                        <p className={styles.traitName}>Offer</p>
                        <p className={styles.traitValue}>
                          {offer.totalPrice}
                          {offer.currencyValue}
                        </p>
                      </div>

                      <div className={styles.eventContainer}>
                        <p className={styles.traitName}>From</p>
                        <p className={styles.traitValue}>
                          {offer.offerorAddress?.slice(0, 4)}...
                          {offer.offerorAddress?.slice(-2)}
                        </p>
                      </div>

                      <div className={styles.eventContainer}>
                        <p className={styles.traitName}>Offer ID</p>
                        <p className={styles.traitValue}>
                          {offer.id}
                        </p>
                      </div>

                      <div className={styles.eventContainer}>
                        <Link
                          className={styles.txHashArrow}
                          href={`${ETHERSCAN_URL}/address/${offer.offerorAddress}`}
                          target="_blank"
                        >
                          ↗
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </>
              ) : bids != "" ? (
              <>
                <h3 className={styles.descriptionTitle}>Bids</h3>
                
                <div className={styles.traitsContainer}>
                  {bids?.map((bid:any, index:number) => (
                    <div
                      key={index}
                      className={styles.eventsContainer}
                    >
                      <div className={styles.eventContainer}>
                        <p className={styles.traitName}>Bids</p>
                        <p className={styles.traitValue}>
                          {bid.bidAmountCurrencyValue.displayValue} 
                          {bid.bidAmountCurrencyValue.symbol}
                        </p>
                      </div>

                      <div className={styles.eventContainer}>
                        <p className={styles.traitName}>From</p>
                        <p className={styles.traitValue}>
                          {bid.bidderAddress?.slice(0, 4)}...
                          {bid.bidderAddress?.slice(-2)}
                        </p>
                      </div>

                      <div className={styles.eventContainer}>
                        <p className={styles.traitName}>Auction ID</p>
                        <p className={styles.traitValue}>
                          {bid.auctionId}
                        </p>
                      </div>

                      <div className={styles.eventContainer}>
                        <Link
                          className={styles.txHashArrow}
                          href={`${ETHERSCAN_URL}/address/${bid.bidderAddress}`}
                          target="_blank"
                        >
                          ↗
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </>
              ) : (
                <>
                <div>
                  <h3>No Bids or Offers</h3>
                </div>
                </>
              )}
              
            
              
            </div>
          }
          </div>

          <div className={styles.listingContainer}>
            {nft && nft.contractMetadata && (
              <div className={styles.contractMetadataContainer}>
                {nft.contractMetadata.image && <MediaRenderer
                  src={nft.contractMetadata.image}
                  className={styles.collectionImage}
                />}
                <p className={styles.collectionName}>{nft.contractMetadata.name}</p>
              </div>
            )}
            {nft &&
            <h1 className={styles.title}>{nft.title}</h1>
            }
            <p className={styles.collectionName}>Token ID #{tokenID}</p>
            {ownerLoaded && owner !== null &&
              <Link
                href={`/profile/${owner.owners[0]}`}
                className={styles.nftOwnerContainer}
              >
              {/* Random linear gradient circle shape */}
              <div
                className={styles.nftOwnerImage}
                style={{
                  background: `linear-gradient(90deg, ${randomColor1}, ${randomColor2})`,
                }}
              />
              <div className={styles.nftOwnerInfo}>
                <p className={styles.label}>Current Owner</p>
                <p className={styles.nftOwnerAddress}>
                {owner.owners[0].slice(0, 4)}...{owner.owners[0].slice(-4)}
                </p>
              </div>
            </Link>}

            <div className={styles.pricingContainer}>
              {/* Pricing information */}
              <div className={styles.pricingInfo}>
                <p className={styles.label}>Price</p>
                <div className={styles.pricingValue}>
                  {loadingContract || loadingDirect || loadingAuction ? (
                    <Skeleton width="120" height="24" />
                  ) : (
                    <>
                      {directListing && directListing[0] ? (
                        <>
                          {directListing[0]?.currencyValuePerToken.displayValue}
                          {" " + directListing[0]?.currencyValuePerToken.symbol}
                        </>
                      ) : auctionListing && auctionListing[0] ? (
                        <>
                          {auctionListing[0]?.buyoutCurrencyValue.displayValue}
                          {" " + auctionListing[0]?.buyoutCurrencyValue.symbol}
                        </>
                      ) : (
                        "Not for sale"
                      )}
                    </>
                  )}
                </div>

                <div>
                  {loadingAuction ? (
                    <Skeleton width="120" height="24" />
                  ) : (
                    <>
                      {auctionListing && auctionListing[0] && (
                        <>
                          <p className={styles.label} style={{ marginTop: 12 }}>
                            Bids starting from
                          </p>

                          <div className={styles.pricingValue}>
                            {
                              auctionListing[0]?.minimumBidCurrencyValue
                                .displayValue
                            }
                            {" " +
                              auctionListing[0]?.minimumBidCurrencyValue.symbol}
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            {ownerLoaded &&
              <div>
      
                <>
                {loadingContract || loadingDirect || loadingAuction ? (
                  <Skeleton width="100%" height="164" />
                ) : (
                  <>
                    <Web3Button
                      contractAddress={MARKETPLACE_ADDRESS}
                      action={async () => await buyListing()}
                      onSuccess={() => {
                        toast(`Purchase success!`, {
                          icon: "✅",
                          style: toastStyle,
                          position: "bottom-center",
                        });
                      }}
                      onError={(e) => {
                        toast(`Purchase failed! Reason: ${e.message}`, {
                          icon: "❌",
                          style: toastStyle,
                          position: "bottom-center",
                        });
                      }}
                    >
                      Buy at asking price
                    </Web3Button>

                    <div className={`${styles.listingTimeContainer} ${styles.or}`}>
                      <p className={styles.listingTime}>or</p>
                    </div>

                    <input
                      className={styles.input}
                      defaultValue={
                        auctionListing?.[0]?.minimumBidCurrencyValue
                          ?.displayValue || 0
                      }
                      type="number"
                      step={0.000001}
                      onChange={(e) => {
                        setBidValue(e.target.value);
                      }}
                    />

                    <Web3Button
                      contractAddress={MARKETPLACE_ADDRESS}
                      action={async () => await createBidOrOffer()}
                      onSuccess={() => {
                        toast(`Bid/Offer success!`, {
                          icon: "✅",
                          style: toastStyle,
                          position: "bottom-center",
                        });
                      }}
                      onError={(e) => {
                        console.log(e);
                        toast(`Bid/Offer failed! Reason: ${e.message}`, {
                          icon: "❌",
                          style: toastStyle,
                          position: "bottom-center",
                        });
                      }}
                    >
                      Place Bid/Offer
                    </Web3Button>
                  </>
                )}
              </>

            </div>
            }
              {ownerLoaded && owner &&
              <>
              {address &&
              <>
                    {directListing && directListing[0] ? (
                        <>
                            <div>
                              {( owner.owners[0].toLowerCase() === address.toLowerCase()) &&  
                                  <Web3Button
                                  className = {styles.cancelListing}
                                  contractAddress={MARKETPLACE_ADDRESS}
                                  action={async () => await cancelListing()}
                                  onSuccess={() => {
                                    toast(`Listing Cancelled`, {
                                      icon: "✅",
                                      style: toastStyle,
                                      position: "bottom-center",
                                    });
                                  }}
                                  onError={(e) => {
                                    console.log(e);
                                    toast(`Cancellation failed! Reason: ${e.message}`, {
                                      icon: "❌",
                                      style: toastStyle,
                                      position: "bottom-center",
                                    });
                                  }}
                                >
                                  Cancel Listing
                                </Web3Button>}
                            </div>
                        </>
                      ) : auctionListing && auctionListing[0] && (
                        <>
                         <div>
                              {( owner.owners[0].toLowerCase() === address.toLowerCase()) &&  
                                  <Web3Button
                                  className = {styles.cancelListing}
                                  contractAddress={MARKETPLACE_ADDRESS}
                                  action={async () => await cancelListing()}
                                  onSuccess={() => {
                                    toast(`Listing Cancelled`, {
                                      icon: "✅",
                                      style: toastStyle,
                                      position: "bottom-center",
                                    });
                                  }}
                                  onError={(e) => {
                                    console.log(e);
                                    toast(`Cancellation failed! Reason: ${e.message}`, {
                                      icon: "❌",
                                      style: toastStyle,
                                      position: "bottom-center",
                                    });
                                  }}
                                >
                                  Cancel Listing
                                </Web3Button>}
                            </div>
                        </>
                      )}
                  </>
              }
              </>
              }
          </div>
        </div>
      </Container>
    </>
  );
}
