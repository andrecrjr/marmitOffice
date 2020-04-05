import React from 'react';
import auth from '@react-native-firebase/auth';
import {View} from 'react-native';

const Logout = ({navigation}) => {
  const logout = async () => {
    try {
      await auth().signOut();
      navigation.navigate('Home', {
        screen: 'User',
        params: {logout: true},
      });
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    logout();
  });
  return null;
};

export default Logout;
