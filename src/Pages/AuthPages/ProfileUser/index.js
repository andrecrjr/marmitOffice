import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Layout from 'components/Layout';
import { useAuthFirebase } from 'components/hooks/useAuth';

const Authenticated = () => {
  const { user, userData } = useAuthFirebase();
  console.log(userData);
  return (
    <Layout>
      <Text>User authenticate {user ? user.email : ''}</Text>
    </Layout>
  );
};

export default Authenticated;