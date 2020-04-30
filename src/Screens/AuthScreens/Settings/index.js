import { CommerceSettings } from '../CommercePages/';
import { UserAuth } from 'components/Layout/UserContext';
import { Text } from 'react-native';
import React from 'react';

export default function Settings(props) {
  const { user, userData } = React.useContext(UserAuth);
  console.log(userData);
  console.log(props.navigation);
  React.useLayoutEffect(() => {
    if (userData.commerceUser) {
      props.navigation.setOptions({
        tabBarVisible: false,
      });
    }
    () => {
      props.navigation.setOptions({
        tabBarVisible: true,
      });
    };
  }, [userData, props.navigation]);

  if (userData.commerceUser) {
    return <CommerceSettings user={userData} />;
  }
  return <Text>Em manutenção</Text>;
}
