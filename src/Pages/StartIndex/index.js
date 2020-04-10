import React, {useEffect} from 'react';
import Layout from 'components/Layout';
import {Text, StyleSheet, View, Alert} from 'react-native';
import Swiper from 'components/LoginSwipe';
import auth from '@react-native-firebase/auth';
import Fila from '../../assets/fila.svg';
import Outline from '../../assets/outline.svg';
import Like from '../../assets/like.svg';
import {styled} from './style';

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
        <Text style={styled.logoMain}>marmitOffice</Text>
        <Text style={styled.sloganMain}>
          Pedir quentinha nunca foi tão fácil!
        </Text>
      </View>
      <MainDescription styled={styled} />
      <Swiper navigation={navigation} />
    </Layout>
  );
}

const MainDescription = ({styled}) => (
  <View style={styled.containerDescription}>
    <View style={styled.description}>
      <Text style={styled.textDescription}>
        {`Não perca tempo da hora do \nalmoço!`}
      </Text>
      <Fila fill={'black'} width={30} height={30} />
    </View>
    <View style={styled.description}>
      <Text
        style={styled.textDescription}>{`Descubra novos marmiteiros...`}</Text>
      <Outline fill={'black'} width={35} height={35} />
    </View>
    <View style={styled.description}>
      <Text style={styled.textDescription}>{`Facil de usar!`}</Text>
      <Like fill={'black'} width={35} height={35} />
    </View>
  </View>
);
