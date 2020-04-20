import CommerceSettings from '../CommercePages/';
import UserAuth from 'components/Layout/UserContext';
import { Text } from 'react-native';
import React from 'react';

export default function Settings({ hasMap }) {
  const { userData } = React.useContext(UserAuth);
  console.log(hasMap);
  if (userData.commerceUser) {
    return <CommerceSettings />;
  }
  return <Text>Em manutenção</Text>;
}
