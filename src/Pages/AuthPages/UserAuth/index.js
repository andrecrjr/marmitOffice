import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Layout from 'components/Layout';
import auth from '@react-native-firebase/auth';

const Authenticated = () => {
  const [user, setUser] = useState();

  const authState = (userData) => {
    console.log('estou aqui');

    setUser(userData);
  };
  useEffect(() => {
    const subscribedUser = auth().onAuthStateChanged(authState);
    return subscribedUser;
  }, []);
  return (
    <Layout>
      <Text>User authenticated </Text>
    </Layout>
  );
};

export default Authenticated;
