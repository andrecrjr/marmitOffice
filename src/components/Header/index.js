import React from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import { UserAuth } from '../Layout/UserContext';
import { HeaderContainer } from './styles';
import ButtonView from '../Button';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
  const { user } = React.useContext(UserAuth);
  const navigator = useNavigation();

  if (user) {
    <HeaderContainer>
      <Text>MarmitOffice</Text>
    </HeaderContainer>;
  }

  return (
    <HeaderContainer>
      {user ? (
        <ButtonView header={true} onPressFn={() => navigator.openDrawer()}>
          Abrir
        </ButtonView>
      ) : null}

      <Text>MarmitOffice</Text>
    </HeaderContainer>
  );
}
