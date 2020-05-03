import React, { useEffect } from 'react';
import DefaultView from '../DefaultView';
import Header from '../Header';

export default function Layout({ children, firstScreen, menuActive }) {
  return (
    <DefaultView>
      {!firstScreen ? <Header menuActive={menuActive} /> : null}
      {children}
    </DefaultView>
  );
}
