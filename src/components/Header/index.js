import React from 'react';
import { UserAuth } from 'components/Contexts/UserContext';
import { displayName } from '../../../app.json';
import { Text, View } from 'react-native';
import { HeaderContainer, Logo } from './styles';
import { ButtonIcon } from '../Button';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function Header(props) {
  const { user } = React.useContext(UserAuth);
  const router = useRoute();
  const { navigate } = useNavigation();

  if (user) {
    <HeaderContainer>
      <Logo>{displayName}</Logo>
    </HeaderContainer>;
  }

  const logoutSettings = () => {
    navigate('Logout');
  };

  console.log('header', navigate);

  return (
    <HeaderContainer>
      <Logo>{displayName}</Logo>
      {user && router.name === 'Settings' ? (
        <View style={{ flexDirection: 'column' }}>
          <ButtonIcon
            nameIcon={'exit-to-app'}
            style={{ paddingRight: 15, justifySelf: 'flex-start' }}
            color={'black'}
            size={28}
            onPress={() => logoutSettings()}
          />
          <Text style={{ fontSize: 9, color: 'red' }}>Logout</Text>
        </View>
      ) : null}
    </HeaderContainer>
  );
}
