import React from 'react';
import Layout from 'components/Layout';
import {Text, StyleSheet, View} from 'react-native';
import Swiper from 'components/LoginSwipe';

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

export default function StartScreenApp({navigation}) {
  return (
    <Layout>
      <View style={styled.principal}>
        <Text>Chega de filas!</Text>
      </View>
      <Swiper navigation={navigation} />
    </Layout>
  );
}
