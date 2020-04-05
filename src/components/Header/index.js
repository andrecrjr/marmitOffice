import React from 'react';
import {Text, ScrollView, StyleSheet, View} from 'react-native';
import useAuthFirebase from '../hooks/useAuth';
import {styled} from './styles';
import ButtonView from '../Button';
import auth from '@react-native-firebase/auth';

export default function Header() {
  return (
    <View style={styled.container}>
      <Text>MarmitOffice</Text>
      <ButtonView>Logout</ButtonView>
    </View>
  );
}
