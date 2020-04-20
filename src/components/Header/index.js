import React from 'react';
import { UserAuth } from 'components/Layout/UserContext';
import { displayName } from '../../../app.json';
import { HeaderContainer, Logo } from './styles';
import ButtonView from '../Button';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
  const { user } = React.useContext(UserAuth);
  const navigator = useNavigation();

  if (user) {
    <HeaderContainer>
      <Logo>{displayName}</Logo>
    </HeaderContainer>;
  }

  return (
    <HeaderContainer>
      {user ? (
        <ButtonView
          header={true}
          styles={{ paddingLeft: 10 }}
          onPressFn={() => navigator.openDrawer()}>
          Abrir
        </ButtonView>
      ) : null}

      <Logo>{displayName}</Logo>
    </HeaderContainer>
  );
}
