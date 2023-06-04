import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";
import {ETHERSCAN_URL, MARKETPLACE_ADDRESS, FOOTER_LOGO} from '../../const/contractAddresses';

export default function Footer() {

    return (
        <>
            <div className={styles.gridFooter}>
                <div className={styles.logoFooterDiv}>
                    <Link id="footerLoader" href="/">
                        <Image src={FOOTER_LOGO} width={150} height={37.5} alt="logo"/>
                    </Link><br/>
                    <p className={styles.font16}>
                        Market gm ☕️ is a direct listings digital marketplace for non-fungible tokens (NFTs).
                        Enabling creators to buy, sell, and discover digital items within the marketplace or independently of Market gm ☕️!
                    </p>
                    <p>
                        Platform fee of 0.5% built into the marketplace <Link className={styles.link} target="_blank" href={`${ETHERSCAN_URL}address/${MARKETPLACE_ADDRESS}`}>contract</Link>.
                    </p> 
                </div>
                <div>
                    <h2 className={styles.footMarket}>About...</h2>
                    <div><Link className={styles.link} target="_blank" href="https://twitter.com/Zero_beings">Twitter</Link></div><br/>
                    <div><Link className={styles.link} target="_blank" href="https://github.com/Zerobeings">Github</Link></div><br/>
                    <div><Link className={styles.link} target="_blank" href="https://discord.gg/sjbVYr6ZXS">Discord</Link></div><br/>
                    <div><Link className={styles.link} target="_blank" href="https://zerobeings.xyz">Project Site</Link></div><br/>
                </div>
                <div>
                    <h2 className={styles.footMarket}>Powered By...</h2>
                    <div><Link className={styles.link} target="_blank" href="https://portal.thirdweb.com/templates/marketplace">thirdweb SDK</Link></div><br/>
                    <div><Link className={styles.link} target="_blank" href="https://docs.alchemy.com/reference/nft-api-quickstart">Alchemy API</Link></div><br/>
                    <div><Link className={styles.link} target="_blank" href="https://multichain-api.rarible.org/v0.1/tag/item-controller#operation/getItemRoyaltiesById">Rarible API</Link></div>
                </div>
                <div>
                    <h2 className={styles.footMarket}>Recommended...</h2>
                    <div><Link className={styles.link} target="_blank" href="https://thirdweb.com/">thirdweb</Link></div><br/>
                    <div><Link className={styles.link} target="_blank" href="https://docs.factoria.app/#/">factoria</Link></div><br/>
                    <div><Link className={styles.link} target="_blank" href="https://cell.computer/#/?id=introduction">cell</Link></div><br/>
                    <div><Link className={styles.link} target="_blank" href="https://moneypipe.xyz/">moneypipe</Link></div><br/>
                </div>
            </div>

        </>
    )
}