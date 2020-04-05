import React from 'react';
import {Text, ScrollView, StyleSheet, View} from 'react-native';
import {styled} from './styles';

export default function Header() {
  return (
    <View style={styled.container}>
      <Text>MarmitOffice</Text>
    </View>
  );
}
