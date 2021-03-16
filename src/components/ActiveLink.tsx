import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import Link from 'next/link'

import styles from '../styles/components/SideMenu.module.css';

interface LinkProps {
  children: ReactNode;
  href: string;
}

const ActiveLink: React.FC<LinkProps> = ({children, href}) => {
  const router = useRouter();
  let isActive = false; 

  if(router.pathname === href) {
    isActive = true;
  }

  return (
    <Link href={href}>
      <a className={isActive ? `${styles.active}` : ''}>
        {children}
      </a>
    </Link>
  )
}

export default ActiveLink;