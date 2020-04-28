import React from 'react';
import { UserAuth } from 'components/Layout/UserContext';
import { displayName } from '../../../app.json';
import { HeaderContainer, Logo } from './styles';
import { ButtonIcon } from '../Button';
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
      <Logo>{displayName}</Logo>
      {user ? (
        <ButtonIcon
          nameIcon={'menu'}
          style={{ paddingRight: 10, justifySelf: 'flex-start' }}
          color={'white'}
          size={28}
          onPress={{}}
        />
      ) : null}
    </HeaderContainer>
  );
}
