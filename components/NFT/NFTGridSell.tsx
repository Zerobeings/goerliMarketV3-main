import type { NFT as NFTType } from "@thirdweb-dev/sdk";
import Link from "next/link";
import React from "react";
import Skeleton from "../Skeleton/Skeleton";
import NFTSell from "./NFT";
import styles from "../../styles/Buy.module.css";

type Props = {
  isLoading: boolean;
  data: NFTType[] | undefined;
  overrideOnclickBehavior?: (nft: NFTType) => void;
  emptyText?: string;
};

export default function NFTGridSell({
  isLoading,
  data,
  overrideOnclickBehavior,
  emptyText = "No NFTs found for this collection.",
}: Props) {
  return (
    <div className={styles.nftGridContainer}>
      {isLoading ? (
        [...Array(20)].map((_, index) => (
          <div key={index} className={styles.nftContainer}>
            <Skeleton key={index} width={"100%"} height="312px" />
          </div>
        ))
      ) : data && data.length > 0 ? (
        data.map((nft) =>
          !overrideOnclickBehavior ? (
            <Link
              href={`/token/${nft.contract.address}/${Number(nft.id.tokenId)}`}
              key={Number(nft.id.tokenId)+nft.contract.address}
              className={styles.nftContainer}
            >
              <NFTSell nft={nft} />
            </Link>
          ) : (
            <div
              key={Number(nft.id.tokenId)+nft.contract.address}
              className={styles.nftContainer}
              onClick={() => overrideOnclickBehavior(nft)}
            >
              <NFTSell nft={nft} collection={nft.contract.address} />
            </div>
          )
        )
      ) : (
        <p>{emptyText}</p>
      )}
    </div>
  );
}
