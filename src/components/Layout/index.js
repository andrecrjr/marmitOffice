import React from 'react';
import DefaultView from '../DefaultView';
import Header from '../Header';
import { useAuthFirebase } from '../hooks/useAuth';
import { UserAuth } from './UserContext';

export default function Layout({ children, firstScreen, menuActive }) {
  const { user, userData, authenticated } = useAuthFirebase();
  return (
    <UserAuth.Provider value={{ user, userData, authenticated }}>
      <DefaultView>
        {!firstScreen ? <Header menuActive={menuActive} /> : null}
        {children}
      </DefaultView>
    </UserAuth.Provider>
  );
}
