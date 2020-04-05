import React from 'react';
import DefaultView from '../DefaultView';
import Header from 'components/Header';

export default function Layout(props) {
  return (
    <DefaultView>
      <Header />
      {props.children}
    </DefaultView>
  );
}
