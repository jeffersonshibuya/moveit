import React from 'react';

import styles from '../styles/components/SideMenu.module.css';
import ActiveLink from './ActiveLink';
import { signOut } from 'next-auth/client'


const SideMenu: React.FC = () => {

  return (
    <div className={styles.container}>
      <img src="/icons/icon.svg" alt="logo"/>
      <nav>
        <ActiveLink href="/home">
          <img src="/icons/home.svg" alt="home"/>
        </ActiveLink>
        <ActiveLink href="/leaderboard">
          <img src="/icons/award.svg" alt="leaderboard"/>
        </ActiveLink>
      </nav>
      <button type="button" onClick={() => signOut()}>
        <img src="/icons/signOut.svg" alt="leaderboard"/>
      </button>
    </div>
  )
}

export default SideMenu;