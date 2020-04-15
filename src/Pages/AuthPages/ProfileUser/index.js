import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Layout from 'components/Layout';
import { useAuthFirebase } from 'components/hooks/useAuth';

const Authenticated = ({ navigation }) => {
  const { user, userData } = useAuthFirebase();
  console.log(userData);
  if (userData.commerceUser) {
    navigation.push('CreateCommerce');
  }
  return (
    <Layout>
      <Text>User authenticate {user ? user.email : ''}</Text>
    </Layout>
  );
};

export default Authenticated;
