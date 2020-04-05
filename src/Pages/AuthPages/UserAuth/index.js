import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Layout from 'components/Layout';
import {useAuthFirebase} from 'components/hooks/useAuth';
import auth from '@react-native-firebase/auth';

const Authenticated = () => {
  const {user} = useAuthFirebase();
  return (
    <Layout>
      <Text>User authenticate {user ? user.email : ''}</Text>
    </Layout>
  );
};

export default Authenticated;
