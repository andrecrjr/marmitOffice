import React from 'react';
import {Text, ScrollView, StyleSheet, View} from 'react-native';
import {styled} from './styles';

export default function Header({navigation}) {
  return (
    <View style={styled.container}>
      <Text>MarmitOffice</Text>
    </View>
  );
}
