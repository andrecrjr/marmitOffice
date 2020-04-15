import React from 'react';
import DefaultView from '../DefaultView';
import Header from '../Header';

export default function Layout({ children, firstScreen }) {
  return (
    <DefaultView>
      {!firstScreen ? <Header /> : null}
      {children}
    </DefaultView>
  );
}
