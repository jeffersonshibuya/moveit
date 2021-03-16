import { NextPage } from 'next';
import React from 'react';
import SideMenu from '../components/SideMenu';

type Page = NextPage & { Layout?: React.FC };

const LandingLayout: React.FC = ({children}) => {
  return (
    <div style={{display: "flex", justifyContent: 'space-between', height: '100vh'}}>
      <SideMenu />
      <div style={{position: 'relative', flex: '1'}}>
        {children}
      </div>
    </div>
  )
}

export default LandingLayout;

export function withLandingLayout(Component: Page) {
  Component.Layout = LandingLayout;
  return Component
}