import React, {useEffect} from 'react';
import Layout from 'components/Layout';
import {Text, StyleSheet, View, Alert} from 'react-native';
import Swiper from 'components/LoginSwipe';
import auth from '@react-native-firebase/auth';

const styled = StyleSheet.create({
  principal: {
    backgroundColor: 'black',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default function StartScreenApp({navigation, route}) {
  const logout = async () => {
    try {
      await auth().signOut();
      Alert.alert('Usuário deslogado com sucesso');
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (route.params !== undefined && route.params.logout) {
      logout();
    }
  }, [route]);
  return (
    <Layout>
      <View style={styled.principal}>
        <Text>Chega de filas!</Text>
      </View>
      <Swiper navigation={navigation} />
    </Layout>
  );
}
