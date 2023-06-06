import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import stylesnav from "./Searchbar.module.css";
import React, { useState, useRef, useEffect } from "react";
import {NAV_LOGO, PROFILE_LOGO} from '../../const/contractAddresses';


export function Searchbar() {
    const [search, setSearch] = useState<string>("");
  const address = useAddress();
  
  return (
    
    <div className={stylesnav.navContainer}>
    <nav className={stylesnav.nav}>
      <div className={stylesnav.navLeft}>
        <Link href="/" className={`${stylesnav.homeLink} ${stylesnav.navLeft}`}>
          <Image
            src={NAV_LOGO}
            width={42}
            height={42}
            alt="Market gm ☕️"
          />
        </Link>
      </div>
      {address && (
          <input
          className={stylesnav.searchBar}
          type={"text"}
          placeholder="Collection"
          onChange={(e)=>(setSearch(e.target.value))}
          onKeyPress={event => {
            if (event.key === 'Enter' && search) {
              location.href = `/collection/${search}`;
            }
          }}
          />
      )}
      <div className={stylesnav.navRight}>
        <div className={stylesnav.navConnect}>
          <ConnectWallet
            theme="dark"
            btnTitle="Login"
           />
        </div>
        {address && (
          <Link className={stylesnav.link} href={`/profile/${address}`}>
            <Image
              className={stylesnav.profileImage}
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
