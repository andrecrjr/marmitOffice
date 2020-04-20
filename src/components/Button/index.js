import { TouchableOpacity } from 'react-native';
import { Button, TextButton, MenuButton } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

export default function ButtonView({
  styles,
  textStyle,
  onPressFn,
  children,
  header,
}) {
  if (header) {
    return (
      <TouchableOpacity style={styles} onPress={onPressFn}>
        <Icon name="menu" size={25} color={'white'} />
      </TouchableOpacity>
    );
  }
  return (
    <Button style={styles} onPress={onPressFn}>
      <TextButton style={textStyle}>{children}</TextButton>
    </Button>
  );
}
/*
export const MenuButton = () => {
  return <MenuButton />;
};
*/
