import React from 'react';
import { NearMeButton } from './style';
import { StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

const NearIcon = (props) => {
  return (
    <>
      <NearMeButton>
        <Icon name={props.name} color={props.color} size={props.size} />
        <Text style={{ color: props.color }}>{props.title}</Text>
      </NearMeButton>
    </>
  );
};

export default NearIcon;
