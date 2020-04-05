import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';

const styled = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default function DefaultView(props) {
  return (
    <SafeAreaView style={styled.container}>
      <View style={styled.container}>
        <StatusBar barStyle="light-content" hidden={false} />
        {props.children}
      </View>
    </SafeAreaView>
  );
}
