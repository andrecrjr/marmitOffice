import React from 'react';
import { Text } from 'react-native';
import Layout from 'components/Layout';
import { useAuthFirebase } from 'components/hooks/useAuth';

const Authenticated = ({ navigation }) => {
  const { user, userData } = useAuthFirebase();
  if (userData.commerceUser) {
    navigation.navigate('User', {
      screen: 'Settings',
      params: {
        hasMap: false,
      },
    });
  }
  return (
    <Layout>
      <Text>User authenticate {user ? user.email : ''}</Text>
    </Layout>
  );
};

export default Authenticated;
