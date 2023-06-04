import styles from "./CollectionInfo.module.css";
import Link from "next/link";
import Image from "next/image";
import FontAwesomeIcon from '@fortawesome/free-solid-svg-icons';
import { NFT } from "@thirdweb-dev/sdk";

type Props = {
  Nfts: NFT;
};

export const CollectionInfo = ({Nfts} : Props) => {
      var NFTs = Nfts;
      return(  
        <>
            {(NFTs[0]?.contractMetadata.openSea.imageUrl) ?
            <Image className={styles.collectionInfoImg} src={`${NFTs[0]?.contractMetadata.openSea.imageUrl}`} alt="" width={200} height={200}/>
            : (NFTs[0]?.metadata.filetype != "mp4" && NFTs[0]?.metadata.filetype === null) ?
            <Image className={styles.collectionInfoImg} src={`${NFTs[0]?.media[0]?.gateway}`} alt="" width={200} height={200}/>
            : (NFTs[0]?.metadata.filetype === "mp4" || NFTs[0]?.metadata.filetype === "webm" || NFTs[0]?.metadata.filetype === "ogg") ?
            <video className={styles.collectionInfoImg} controls><source src={`${NFTs[0]?.media[0].gateway}`}/></video>
            : <Image className={styles.collectionInfoImg} src={NFTs[0]?.media[0].gateway} alt="" width={200} height={200}/>
            }
            <div className={styles.collectionInfoIcons}>
                {(NFTs[0]?.contract.address === '0x8fba3ebe77d3371406a77eeaf40c89c1ed55364a' 
                || NFTs[0]?.contract.address === '0xb6c29b68fecedbf005743c3eaf5139328b651deb' 
                || NFTs[0]?.contract.address === '0x8f170F73076b7A45749677B1681b13366B3C80f7' 
                || NFTs[0]?.contract.address === '0x6866ed9a183f491024692971a8f78b048fb6b89b'
                || NFTs[0]?.contract.address === '0x8d085750cdabca5e8485d0310b7eb0fc0ef2103c'
                || NFTs[0]?.contract.address === '0xbe4bef8735107db540de269ff82c7de9ef68c51b' 
                || NFTs[0]?.contractMetadata.openSea.safelistRequestStatus === 'verified') &&
                <Image className={styles.width18px} src="/verified.png" alt="" width={200} height={200}/>}
                {(NFTs[0]?.contractMetadata.openSea.twitterUsername != null) &&
                <Link target="_blank" href={`https://twitter.com/${NFTs[0]?.contractMetadata.openSea.twitterUsername}`}><FontAwesomeIcon icon="fa-brands fa-twitter" className={styles.socialLinksInfo}/></Link>
                }
                {(NFTs[0]?.contractMetadata.openSea.discordUrl != null) &&
                <Link target="_blank" href={`${NFTs[0]?.contractMetadata.openSea.discordUrl}`} rel="noopener noreferrer"><FontAwesomeIcon icon="fa-brands fa-discord" className={styles.socialLinksInfo}/></Link>
                }
                {(NFTs[0]?.contractMetadata.openSea.externalUrl != null) &&
                <Link target="_blank" href={`${NFTs[0]?.contractMetadata.openSea.externalUrl}`} rel="noopener noreferrer"><FontAwesomeIcon icon="fa-solid fa-globe" className={styles.socialLinksInfo}/></Link>
                }
            </div>
            <div className={styles.gridCollectionInfo}>
                <div className={styles.collectionInfoLabels}>Name:</div>
                {(NFTs[0]?.contractMetadata.name != null) ? 
                <div className={styles.textLeft}>{`${NFTs[0]?.contractMetadata.name}`}</div>
                :
                <div className={styles.textLeft}>Not Available</div>
                }
                <div className={styles.collectionInfoLabels}>About:</div>
                {(NFTs[0]?.metadata.description != null) ? 
                <div className={styles.textLeft}>{`${NFTs[0]?.metadata.description}`}</div>
                :
                <div className={styles.textLeft} > Test NFT collection to support development.</div>
                }
                 <div className={styles.collectionInfoLabels}>Type:</div>
                 {(NFTs[0]?.contractMetadata.tokenType != null) &&
                  <div className={styles.textLeft}>{NFTs[0]?.contractMetadata.tokenType}</div>
                 }
                <div className={styles.collectionInfoLabels}>Description:</div>
                {(NFTs[0]?.contractMetadata.openSea.description != null && NFTs[0]?.contractMetadata.openSea.description.trim().length != 0) ?
                <div className={styles.collectionDescription}>{NFTs[0]?.contractMetadata.openSea.description}</div>
                :
                <div className={styles.collectionDescription}>Not Available</div>
                  }
            </div>
      </>
    )

}