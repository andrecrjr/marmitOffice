import React, {useEffect} from 'react';
import Layout from 'components/Layout';
import {Text, StyleSheet, View, Alert} from 'react-native';
import Swiper from 'components/LoginSwipe';
import auth from '@react-native-firebase/auth';

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
    <Layout firstScreen={true}>
      <View style={styled.container}>
        <Text style={styled.logoMain}>MarmitOffice</Text>
        <Text style={styled.sloganMain}>
          Pedir quentinha nunca foi tão fácil!
        </Text>
      </View>
      <Swiper navigation={navigation} />
    </Layout>
  );
}

const styled = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DF3030',
  },
});
