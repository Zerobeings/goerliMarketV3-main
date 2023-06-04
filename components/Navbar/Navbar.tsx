import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import React, { useState, useRef, useEffect } from "react";
import {NAV_LOGO, PROFILE_LOGO} from '../../const/contractAddresses';

/**
 * Navigation bar that shows up on all pages.
 * Rendered in _app.tsx file above the page content.
 */
export function Navbar() {
  
  const address = useAddress();
  
  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Link href="/" className={`${styles.homeLink} ${styles.navLeft}`}>
            <Image
              src={NAV_LOGO}
              width={42}
              height={42}
              alt="Market gm ☕️"
            />
          </Link>
        </div>

            
        <div className={styles.navRight}>
          <div className={styles.navConnect}>
            <ConnectWallet 
              theme="dark"
              btnTitle="Login"
             />
          </div>
          {address && (
            <Link className={styles.link} href={`/profile/${address}`}>
              <Image
                className={styles.profileImage}
                src={PROFILE_LOGO}
                width={42}
                height={42}
                alt="Profile"
              />
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
